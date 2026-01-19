import type { Size } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type HeaderAreaTitleProps = {
  title?: string;
  subtitle?: string;
  titleChildren?: ReactNode;
  subtitleChildren?: ReactNode;
  titleSize?: Size;
  subtitleSize?: Size;
} & HTMLAttributes<HTMLDivElement>;
