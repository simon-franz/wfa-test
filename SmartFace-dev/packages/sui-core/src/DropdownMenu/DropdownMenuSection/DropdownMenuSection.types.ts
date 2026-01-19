import type { HTMLAttributes, ReactNode } from 'react';

export type DropdownMenuSectionProps = {
  title: string;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;
