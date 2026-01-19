import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type SqwMenuButtonProps = {
  icon?: ReactNode;
  badge?: ReactNode;
  text?: string;
  disabled?: boolean;
  stopPropagation?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
