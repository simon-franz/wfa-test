import type { HTMLAttributes, ReactNode } from 'react';

export type ServerStatusProps = {
  statusCode?: string;
  title?: string;
  subtitle?: string;
  media?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
