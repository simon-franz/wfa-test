import type { Color, Size } from '@hrworks/types/shared/UiTypes';
import type { EdgeMarkerType } from '@xyflow/react';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { WorkflowGraphEdgeBackendDefinition } from './Edge/WorkflowGraphEdgesAdapter.types';
import type { WorkflowGraphNodeBackendDefinition } from './Node/WorkflowGraphNodesAdapter.types';

export type WorkflowGraphColor = Color | 'neutral';

export type WorkflowGraphBackendProps = {
  nodes: WorkflowGraphNodeBackendDefinition[];
  edges: WorkflowGraphEdgeBackendDefinition[];
  direction?: 'TB' | 'BT' | 'LR' | 'RL';
  fullHeight?: boolean;
  defaultNodeSize?: Size;
  defaultNodeColor?: WorkflowGraphColor;
  defaultEdgeColor?: WorkflowGraphColor;
  defaultEdgeMarkerStart?: EdgeMarkerType;
  defaultEdgeMarkerEnd?: EdgeMarkerType;
};

export type WorkflowGraphBackendDefinition = SmartFaceBackendComponent<'WorkflowGraph', WorkflowGraphBackendProps>;

export type WorkflowGraphAdapterProps = SmartFaceAdapterPropsType<WorkflowGraphBackendDefinition>;
