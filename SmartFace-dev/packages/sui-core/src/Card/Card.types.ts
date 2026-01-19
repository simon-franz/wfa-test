import type { HTMLAttributes, MouseEvent } from 'react';

export type CardProps = {
  fullHeight?: boolean;
  onClick?: (event: MouseEvent) => void;
} & HTMLAttributes<HTMLDivElement>;
