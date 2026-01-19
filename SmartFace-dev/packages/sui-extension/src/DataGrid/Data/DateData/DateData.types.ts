import type { HTMLAttributes } from 'react';

export type DateDataProps = {
  value: unknown;
} & Omit<HTMLAttributes<HTMLImageElement>, 'children'>;
