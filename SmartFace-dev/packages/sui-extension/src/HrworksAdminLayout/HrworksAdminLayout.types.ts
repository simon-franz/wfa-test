import type { LogoProps } from '@hrworks/sui-core/Logo';
import type { HTMLAttributes, ReactNode } from 'react';

export type HrworksAdminLayoutProps = {
  activeNavigationItemId?: string;
  header?: {
    logo?: LogoProps;
    navigationItems?: ReactNode;
    children?: ReactNode;
  };
  contentHeaderChildren?: ReactNode;
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
