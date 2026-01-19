import type { HTMLAttributes, ReactNode } from 'react';

export type CardTitleProps = {
  subtitle?: string;
  icon?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
