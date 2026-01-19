import type { ReactElement, ReactNode } from 'react';

export type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactElement;
};
