import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';

import type { SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';
import type { WorkflowGraphColor } from '../WorkflowGraphAdapter.types';
import type { Handle, Marker } from '@hrworks/sui-extension/WorkflowGraph/WorkflowEdge/WorkflowEdge.types';

export type WorkflowGraphEdgeBackendProps = {
  sourceNodeSfId: string;
  targetNodeSfId: string;
  markerEnd?: Marker;
  markerStart?: Marker;
  animated?: boolean;
  onClick?: SfEventType;
  sourceHandle?: Handle;
  targetHandle?: Handle;
  color?: WorkflowGraphColor;
  label?: string;
};

export type WorkflowGraphEdgeBackendDefinition = SmartFaceBackendComponentPart<WorkflowGraphEdgeBackendProps>;
