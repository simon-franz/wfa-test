import type { HTMLAttributes } from 'react';

export type ListProps = {
  selectedItemId?: string;
  hoverable?: boolean;
  lineStyle?: 'solid' | 'dotted' | 'dashed' | 'none';
} & HTMLAttributes<HTMLUListElement>;
