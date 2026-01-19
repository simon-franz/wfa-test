import type { HTMLAttributes } from 'react';

export type PortrayedListProps = {
  selectedItemId?: string;
  hoverable?: boolean;
  lineStyle?: 'solid' | 'dotted' | 'dashed' | 'none';
} & HTMLAttributes<HTMLUListElement>;
