import type { LogoProps } from '@hrworks/sui-core/Logo';
import type { HTMLAttributes } from 'react';

import type { HeaderProps } from '../Header';

export type BrandingProps = HeaderProps & LogoProps & HTMLAttributes<HTMLDivElement>;
