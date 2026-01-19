import type { AlignTitle } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type HeroTitleProps = {
  subtitle?: string;
  alignTitle?: AlignTitle;
} & HTMLAttributes<HTMLElement>;
