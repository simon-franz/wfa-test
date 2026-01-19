import type { OnClickLinkProps } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type LogoProps = {
  alt?: string;
  src?: string;
  title?: string;
} & OnClickLinkProps &
  HTMLAttributes<HTMLElement>;
