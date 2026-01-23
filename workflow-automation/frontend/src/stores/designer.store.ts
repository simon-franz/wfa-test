import { create } from 'zustand';
import { useAuthStore } from './auth.store';
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
  executionState?: NodeExecutionState;
}

export interface NodeExecutionState {
  status: 'idle' | 'ready' | 'running' | 'success' | 'error';
  input?: Record<string, unknown>;
  output?: unknown;
  error?: string;
  executedAt?: Date;
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

  // Context scopes for variable suggestions
  getAvailableVariables: () => { scope: string; key: string; path: string }[];

  // Actions
  setNodes: (nodes: WorkflowNode[]) => void;
  setEdges: (edges: WorkflowEdge[]) => void;
  onNodesChange: (changes: NodeChange<WorkflowNode>[]) => void;
  onEdgesChange: (changes: EdgeChange<WorkflowEdge>[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (nodeType: string, position: { x: number; y: number }) => void;
  updateNodeConfig: (nodeId: string, config: Record<string, unknown>) => void;
  updateNodeName: (nodeId: string, name: string) => void;
  updateNodeLabel: (nodeId: string, label: string) => void; // Alias for updateNodeName
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

  // Node Execution
  executeNode: (nodeId: string) => Promise<void>;
  canExecuteNode: (nodeId: string) => boolean;
  clearNodeExecution: (nodeId: string) => void;
  clearAllExecutions: () => void;
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
  if (nodeType === 'calculation') {
    return 'calculationNode';
  }
  if (nodeType === 'hrworks') {
    return 'hrworksNode';
  }
  if (nodeType === 'data-transform') {
    return 'dataTransformNode';
  }
  return 'actionNode';
}

let nodeIdCounter = 0;
const generateNodeId = () => `node-${Date.now()}-${++nodeIdCounter}`;
const generateEdgeId = () => `edge-${Date.now()}-${++nodeIdCounter}`;

function getDefaultNodeLabel(nodeType: string): string {
  const labels: Record<string, string> = {
    'manual-trigger': 'Manueller Trigger',
    'scheduled-trigger': 'Geplanter Trigger',
    'webhook-trigger': 'Webhook Trigger',
    'http-request': 'HTTP Request',
    'email': 'E-Mail senden',
    'condition': 'Bedingung',
    'calculation': 'Berechnung',
    'delay': 'Verzögerung',
    'hrworks': 'HR WORKS',
    'data-transform': 'Daten-Transformation',
    'loop': 'Schleife',
    'switch': 'Switch',
  };
  return labels[nodeType] || 'Neuer Knoten';
}

function getDefaultNodeConfig(nodeType: string): Record<string, unknown> {
  const configs: Record<string, Record<string, unknown>> = {
    'manual-trigger': {},
    'scheduled-trigger': { cronExpression: '0 9 * * 1-5' },
    'http-request': { method: 'GET', url: '' },
    'condition': {
      conditions: [
        { id: 'condition-1', label: 'Condition 1', expression: 'true' },
      ],
      enableDefault: true,
    },
    'calculation': { operation: 'addWeeks', inputValue: '', amount: 1, outputField: 'result' },
    'delay': { duration: 5, unit: 'seconds' },
    'hrworks': { endpoint: '', parameters: {} },
    'data-transform': { operation: 'count', inputPath: '' },
  };
  return configs[nodeType] || {};
}

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

  addNode: (nodeType, position) => {
    get().pushToHistory();
    
    const nodeId = generateNodeId();
    const newNode: WorkflowNode = {
      id: nodeId,
      type: getFlowNodeType(nodeType),
      position,
      data: {
        label: getDefaultNodeLabel(nodeType),
        nodeType,
        config: getDefaultNodeConfig(nodeType),
      },
    };
    
    set((state) => ({
      nodes: [...state.nodes, newNode],
      isDirty: true,
    }));
  },

  updateNodeConfig: (nodeId, config) => {
    const { nodes, edges } = get();
    
    // Clear execution state for this node and all dependent nodes
    const nodesToClear = new Set<string>([nodeId]);
    
    // Find all nodes that depend on this node (recursively)
    const findDependents = (id: string) => {
      edges
        .filter((e) => e.source === id)
        .forEach((edge) => {
          if (!nodesToClear.has(edge.target)) {
            nodesToClear.add(edge.target);
            findDependents(edge.target);
          }
        });
    };
    
    findDependents(nodeId);
    
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === nodeId) {
          return { 
            ...node, 
            data: { 
              ...node.data, 
              config,
              executionState: undefined, // Clear execution state when config changes
            } 
          };
        }
        if (nodesToClear.has(node.id)) {
          return {
            ...node,
            data: {
              ...node.data,
              executionState: undefined, // Clear dependent nodes too
            },
          };
        }
        return node;
      }),
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

  updateNodeLabel: (nodeId, label) => {
    // Alias for updateNodeName
    get().updateNodeName(nodeId, label);
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

  // Node Execution
  canExecuteNode: (nodeId) => {
    const { nodes, edges } = get();
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) {
      console.log('canExecuteNode: node not found', nodeId);
      return false;
    }

    // Find all predecessor nodes
    const predecessors = edges
      .filter((e) => e.target === nodeId)
      .map((e) => nodes.find((n) => n.id === e.source))
      .filter(Boolean);

    console.log('canExecuteNode:', {
      nodeId,
      nodeType: node.data.nodeType,
      predecessorsCount: predecessors.length,
      predecessors: predecessors.map(p => ({ id: p.id, status: p.data.executionState?.status })),
      result: predecessors.length === 0 ? true : predecessors.some(pred => pred?.data.executionState?.status === 'success')
    });

    // Trigger nodes can always be executed
    if (node.data.nodeType.includes('trigger')) {
      return true;
    }

    // Nodes without predecessors can be executed (e.g., HR WORKS nodes)
    if (predecessors.length === 0) {
      return true;
    }

    // In test mode: At least ONE predecessor must have been executed successfully (OR-Join)
    return predecessors.some(
      (pred) => pred?.data.executionState?.status === 'success'
    );
  },

  executeNode: async (nodeId) => {
    const { nodes, edges } = get();
    const node = nodes.find((n) => n.id === nodeId);
    if (!node || !get().canExecuteNode(nodeId)) return;

    // Collect outputs from predecessor nodes (before try block so it's accessible in catch)
    const predecessorOutputs: Record<string, unknown> = {};
    edges
      .filter((e) => e.target === nodeId)
      .forEach((edge) => {
        const predNode = nodes.find((n) => n.id === edge.source);
        if (predNode?.data.executionState?.output) {
          predecessorOutputs[predNode.data.label] = predNode.data.executionState.output;
        }
      });

    // Set running state
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              data: {
                ...n.data,
                executionState: { status: 'running' },
              },
            }
          : n
      ),
    }));

    try {

      // Call backend API to execute node
      const token = useAuthStore.getState().accessToken;
      const response = await fetch('/api/workflows/test-node', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nodeType: node.data.nodeType,
          config: node.data.config,
          context: predecessorOutputs,
        }),
      });

      if (!response.ok) {
        // Try to get the error message from the response body
        let errorMessage = response.statusText;
        try {
          const errorBody = await response.json();
          errorMessage = errorBody.message || errorBody.error || response.statusText;
        } catch {
          // If parsing fails, use status text
        }
        throw new Error(`Execution failed: ${errorMessage}`);
      }

      const result = await response.json();

      // Set success state with input and output
      set((state) => ({
        nodes: state.nodes.map((n) =>
          n.id === nodeId
            ? {
                ...n,
                data: {
                  ...n.data,
                  executionState: {
                    status: 'success',
                    input: predecessorOutputs,
                    output: result.output,
                    executedAt: new Date(),
                  },
                },
              }
            : n
        ),
      }));
    } catch (error) {
      // Set error state with input for debugging
      set((state) => ({
        nodes: state.nodes.map((n) =>
          n.id === nodeId
            ? {
                ...n,
                data: {
                  ...n.data,
                  executionState: {
                    status: 'error',
                    input: predecessorOutputs,
                    error: error instanceof Error ? error.message : 'Unknown error',
                    executedAt: new Date(),
                  },
                },
              }
            : n
        ),
      }));
    }
  },

  clearNodeExecution: (nodeId) => {
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              data: {
                ...n.data,
                executionState: undefined,
              },
            }
          : n
      ),
    }));
  },

  clearAllExecutions: () => {
    set((state) => ({
      nodes: state.nodes.map((n) => ({
        ...n,
        data: {
          ...n.data,
          executionState: undefined,
        },
      })),
    }));
  },

  getAvailableVariables: () => {
    const { nodes } = get();
    const variables: { scope: string; key: string; path: string }[] = [];

    // Global context variables
    variables.push(
      { scope: 'global', key: 'currentDate', path: 'global.currentDate' },
      { scope: 'global', key: 'currentTime', path: 'global.currentTime' },
      { scope: 'global', key: 'currentDateTime', path: 'global.currentDateTime' },
      { scope: 'global', key: 'weekday', path: 'global.weekday' }
    );

    // Workflow context variables
    variables.push(
      { scope: 'workflow', key: 'name', path: 'workflow.name' },
      { scope: 'workflow', key: 'description', path: 'workflow.description' }
    );

    // Execution context variables
    variables.push(
      { scope: 'execution', key: 'variables', path: 'execution.variables' }
    );

    // Node outputs
    nodes.forEach((node) => {
      if (node.data.label) {
        variables.push({
          scope: 'node',
          key: node.data.label,
          path: node.data.label,
        });
      }
    });

    return variables;
  },
}));
