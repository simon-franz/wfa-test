import type { HTMLAttributes, ReactNode } from 'react';

export type InputDisplayProps = {
  media?: ReactNode;
  label?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
