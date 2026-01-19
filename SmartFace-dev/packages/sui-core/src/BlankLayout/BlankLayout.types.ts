import type { HTMLAttributes } from 'react';

import type { LogoProps } from '../Logo';

export type BlankLayoutProps = {
  borderless?: boolean;
  logo?: LogoProps;
} & HTMLAttributes<HTMLDivElement>;
