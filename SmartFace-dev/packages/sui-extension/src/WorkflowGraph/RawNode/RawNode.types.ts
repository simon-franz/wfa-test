import type { Size } from '@hrworks/types/shared/UiTypes';
import type { Position } from '@xyflow/react';
import type { ReactNode } from 'react';

import type { WorkflowGraphColor } from '../WorkflowGraph.types';

export type WorkflowGraphNodeProps = {
  id: string;
  type: 'rawNode';
} & WorkflowGraphNodeDataProps;

export type WorkflowGraphNodeDataProps = {
  sourcePosition: Position;
  targetPosition: Position;
  children: ReactNode;
  onClick?: () => void;
  color?: WorkflowGraphColor;
  size?: Size;
  height?: number;
  width?: number;
  rank?: number;
  'data-guide-id'?: string;
  positionContent?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'middle-left'
    | 'middle-center'
    | 'middle-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
};
