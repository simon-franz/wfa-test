import type { LogoProps } from '@hrworks/sui-core/Logo';
import type { HTMLAttributes, ReactNode } from 'react';

export type SplitLayoutProps = {
  expandSidebar?: boolean;
  sidebarChildren?: ReactNode;
  logo?: LogoProps;
} & HTMLAttributes<HTMLDivElement>;
