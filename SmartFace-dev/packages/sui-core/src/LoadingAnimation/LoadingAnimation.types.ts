import type { HTMLAttributes } from 'react';

export type LoadingAnimationProps = {
  type: 'spinner' | 'shimmer';
  count?: number;
  minWidth?: number;
  maxWidth?: number;
} & HTMLAttributes<HTMLDivElement>;
