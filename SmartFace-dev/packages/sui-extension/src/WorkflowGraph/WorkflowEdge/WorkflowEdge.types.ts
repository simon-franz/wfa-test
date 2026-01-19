import type { WorkflowGraphColor } from '../WorkflowGraph.types';

export type Handle = 'forward' | 'sideways' | 'top' | 'right' | 'bottom' | 'left';
export type MarkerLocation = 'start' | 'end';
export type Marker = 'arrow' | 'none';

export type WorkflowGraphEdgeProps = {
  source: string;
  target: string;
  id: string;
  type: 'workflowEdge';
  onClick?: () => void;
  animated?: boolean;
  sourceHandle?: Handle;
  targetHandle?: Handle;
  color?: WorkflowGraphColor;
  label?: string;
  data?: {
    markerStart?: Marker;
    markerEnd?: Marker;
    color?: WorkflowGraphColor;
    label?: string;
    onClick?: () => void;
  };
};
