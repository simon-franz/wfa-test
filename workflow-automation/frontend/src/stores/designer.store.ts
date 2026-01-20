import { create } from 'zustand';
import {
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge,
} from '@xyflow/react';
import type { BaseNodeConfig, WorkflowDefinition } from 'shared/types';

// Custom node data type
export interface WorkflowNodeData {
  label: string;
  nodeType: string;
  config: Record<string, unknown>;
}

export type WorkflowNode = Node<WorkflowNodeData>;
export type WorkflowEdge = Edge;

// History state for undo/redo
interface HistoryState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

interface DesignerState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  isDirty: boolean;

  // History for undo/redo
  history: HistoryState[];
  historyIndex: number;
  maxHistorySize: number;

  // Actions
  setNodes: (nodes: WorkflowNode[]) => void;
  setEdges: (edges: WorkflowEdge[]) => void;
  onNodesChange: (changes: NodeChange<WorkflowNode>[]) => void;
  onEdgesChange: (changes: EdgeChange<WorkflowEdge>[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: WorkflowNode) => void;
  updateNodeConfig: (nodeId: string, config: Record<string, unknown>) => void;
  updateNodeName: (nodeId: string, name: string) => void;
  deleteNode: (nodeId: string) => void;
  deleteEdge: (edgeId: string) => void;
  selectNode: (nodeId: string | null) => void;
  loadFromDefinition: (definition: WorkflowDefinition) => void;
  toDefinition: () => WorkflowDefinition;
  resetDirty: () => void;
  reset: () => void;

  // Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  pushToHistory: () => void;
}

// Convert workflow definition to React Flow nodes/edges
function definitionToFlow(definition: WorkflowDefinition): {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
} {
  const nodes: WorkflowNode[] = definition.nodes.map((node) => ({
    id: node.id,
    type: getFlowNodeType(node.type),
    position: node.position,
    data: {
      label: node.name,
      nodeType: node.type,
      config: node.config,
    },
  }));

  const edges: WorkflowEdge[] = definition.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle,
    targetHandle: edge.targetHandle,
  }));

  return { nodes, edges };
}

// Convert React Flow nodes/edges back to workflow definition
function flowToDefinition(nodes: WorkflowNode[], edges: WorkflowEdge[]): WorkflowDefinition {
  const defNodes: BaseNodeConfig[] = nodes.map((node) => ({
    id: node.id,
    type: node.data.nodeType as BaseNodeConfig['type'],
    name: node.data.label,
    position: node.position,
    config: node.data.config,
  }));

  const defEdges = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle || undefined,
    targetHandle: edge.targetHandle || undefined,
  }));

  return {
    nodes: defNodes,
    edges: defEdges,
  };
}

// Map workflow node types to React Flow custom node types
function getFlowNodeType(nodeType: string): string {
  if (nodeType.includes('trigger')) {
    return 'triggerNode';
  }
  if (nodeType === 'condition') {
    return 'conditionNode';
  }
  return 'actionNode';
}

let nodeIdCounter = 0;
const generateNodeId = () => `node-${Date.now()}-${++nodeIdCounter}`;
const generateEdgeId = () => `edge-${Date.now()}-${++nodeIdCounter}`;

export const useDesignerStore = create<DesignerState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  isDirty: false,

  // History for undo/redo
  history: [],
  historyIndex: -1,
  maxHistorySize: 50,

  pushToHistory: () => {
    const { nodes, edges, history, historyIndex, maxHistorySize } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges)),
    });

    // Limit history size
    if (newHistory.length > maxHistorySize) {
      newHistory.shift();
    }

    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      set({
        nodes: JSON.parse(JSON.stringify(prevState.nodes)),
        edges: JSON.parse(JSON.stringify(prevState.edges)),
        historyIndex: historyIndex - 1,
        isDirty: true,
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      set({
        nodes: JSON.parse(JSON.stringify(nextState.nodes)),
        edges: JSON.parse(JSON.stringify(nextState.edges)),
        historyIndex: historyIndex + 1,
        isDirty: true,
      });
    }
  },

  canUndo: () => {
    const { historyIndex } = get();
    return historyIndex > 0;
  },

  canRedo: () => {
    const { history, historyIndex } = get();
    return historyIndex < history.length - 1;
  },

  setNodes: (nodes) => {
    get().pushToHistory();
    set({ nodes, isDirty: true });
  },

  setEdges: (edges) => {
    get().pushToHistory();
    set({ edges, isDirty: true });
  },

  onNodesChange: (changes) => {
    // Only push to history for significant changes (not selection/position during drag)
    const hasSignificantChange = changes.some(
      (c) => c.type === 'remove' || c.type === 'add'
    );
    if (hasSignificantChange) {
      get().pushToHistory();
    }

    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
      isDirty: true,
    }));
  },

  onEdgesChange: (changes) => {
    const hasSignificantChange = changes.some(
      (c) => c.type === 'remove' || c.type === 'add'
    );
    if (hasSignificantChange) {
      get().pushToHistory();
    }

    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
      isDirty: true,
    }));
  },

  onConnect: (connection) => {
    get().pushToHistory();
    set((state) => ({
      edges: addEdge({ ...connection, id: generateEdgeId() }, state.edges),
      isDirty: true,
    }));
  },

  addNode: (node) => {
    get().pushToHistory();
    set((state) => ({
      nodes: [...state.nodes, { ...node, id: node.id || generateNodeId() }],
      isDirty: true,
    }));
  },

  updateNodeConfig: (nodeId, config) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, config } }
          : node,
      ),
      isDirty: true,
    }));
  },

  updateNodeName: (nodeId, name) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, label: name } }
          : node,
      ),
      isDirty: true,
    }));
  },

  deleteNode: (nodeId) => {
    get().pushToHistory();
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId,
      ),
      selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
      isDirty: true,
    }));
  },

  deleteEdge: (edgeId) => {
    get().pushToHistory();
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== edgeId),
      isDirty: true,
    }));
  },

  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),

  loadFromDefinition: (definition) => {
    const { nodes, edges } = definitionToFlow(definition);
    // Initialize history with loaded state
    const initialState = {
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges)),
    };
    set({
      nodes,
      edges,
      isDirty: false,
      selectedNodeId: null,
      history: [initialState],
      historyIndex: 0,
    });
  },

  toDefinition: () => {
    const { nodes, edges } = get();
    return flowToDefinition(nodes, edges);
  },

  resetDirty: () => set({ isDirty: false }),

  reset: () =>
    set({
      nodes: [],
      edges: [],
      selectedNodeId: null,
      isDirty: false,
      history: [],
      historyIndex: -1,
    }),
}));
