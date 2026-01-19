import type { LogoProps } from '@hrworks/sui-core/Logo';
import type { HTMLAttributes, ReactNode } from 'react';

export type SidebarProps = {
  brandingElement?: ReactNode;
  logo?: LogoProps;
  upperSidebarChildren?: ReactNode;
  showUpperSidebarChildren?: boolean;
} & HTMLAttributes<HTMLDivElement>;
