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

interface DesignerState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  isDirty: boolean;

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
  selectNode: (nodeId: string | null) => void;
  loadFromDefinition: (definition: WorkflowDefinition) => void;
  toDefinition: () => WorkflowDefinition;
  resetDirty: () => void;
  reset: () => void;
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

  setNodes: (nodes) => set({ nodes, isDirty: true }),
  setEdges: (edges) => set({ edges, isDirty: true }),

  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
      isDirty: true,
    }));
  },

  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
      isDirty: true,
    }));
  },

  onConnect: (connection) => {
    set((state) => ({
      edges: addEdge({ ...connection, id: generateEdgeId() }, state.edges),
      isDirty: true,
    }));
  },

  addNode: (node) => {
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
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId,
      ),
      selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
      isDirty: true,
    }));
  },

  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),

  loadFromDefinition: (definition) => {
    const { nodes, edges } = definitionToFlow(definition);
    set({ nodes, edges, isDirty: false, selectedNodeId: null });
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
    }),
}));
