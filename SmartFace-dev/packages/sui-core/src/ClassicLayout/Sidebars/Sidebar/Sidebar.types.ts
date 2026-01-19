import type { HTMLAttributes, ReactNode } from 'react';

export type SidebarProps = {
  brandingElement?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
