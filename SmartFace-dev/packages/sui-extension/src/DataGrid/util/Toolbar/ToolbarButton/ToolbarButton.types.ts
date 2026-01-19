import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ToolbarButtonProps = {
  icon?: ReactNode;
  menu: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>;
