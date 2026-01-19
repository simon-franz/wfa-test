import type { HTMLAttributes, ReactNode } from 'react';

import type { LogoProps } from '../../Logo';

export type HeaderProps = {
  logo?: LogoProps;
  flexComponentChildren?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
