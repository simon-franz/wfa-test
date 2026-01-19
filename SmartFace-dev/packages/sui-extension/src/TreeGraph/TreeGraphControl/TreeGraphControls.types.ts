import type { ReactFlowInstance } from '@xyflow/react';
import type { HTMLAttributes, ReactNode } from 'react';

export type TreeGraphControlsProps = {
  reactFlowInstance: ReactFlowInstance;
  showControls: boolean;
  controlsChildren?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
