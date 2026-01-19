import type { ReactNode } from 'react';

export type SmartFaceErrorBoundaryProps = {
  children?: ReactNode;
};

export type SmartFaceErrorBoundaryState = {
  error: Error | null;
};
