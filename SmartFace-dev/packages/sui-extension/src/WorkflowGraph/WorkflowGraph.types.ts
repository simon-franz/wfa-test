import type { Color, Size } from '@hrworks/types/shared/UiTypes';
import type { EdgeMarkerType } from '@xyflow/react';
import type { HTMLAttributes } from 'react';

import type { WorkflowGraphNodeProps } from './RawNode/RawNode.types';
import type { WorkflowGraphEdgeProps } from './WorkflowEdge/WorkflowEdge.types';

export type WorkflowGraphColor = Color | 'neutral';

export type WorkflowGraphDefaultProps = {
  defaultNodeSize?: Size;
  defaultNodeColor?: WorkflowGraphColor;
  defaultEdgeColor?: WorkflowGraphColor;
  defaultEdgeMarkerStart?: EdgeMarkerType;
  defaultEdgeMarkerEnd?: EdgeMarkerType;
};

export type WorkflowGraphProps = {
  nodes: WorkflowGraphNodeProps[];
  edges: WorkflowGraphEdgeProps[];
  direction?: 'TB' | 'BT' | 'LR' | 'RL';
  fullHeight?: boolean;
} & HTMLAttributes<HTMLDivElement> &
  WorkflowGraphDefaultProps;
