import type { HTMLAttributes, ReactNode } from 'react';

export type ContentProps = {
  headerChildren?: ReactNode;
  headerFixed?: 'never';
} & HTMLAttributes<HTMLDivElement>;
