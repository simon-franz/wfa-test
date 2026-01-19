import type { HTMLAttributes, ReactNode } from 'react';

export type DataWidgetProps = {
  label?: string;
  value?: string;
  icon?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
