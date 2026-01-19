import type { LogoProps } from '@hrworks/sui-core/Logo';
import type { HTMLAttributes, ReactNode } from 'react';

export type HeaderProps = {
  logo?: LogoProps;
  leftItems?: ReactNode;
  rightItems?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
