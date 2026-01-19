import type { Separator, Size } from '@hrworks/types/shared/UiTypes';
import type { OlHTMLAttributes } from 'react';

export type BreadcrumbProps = {
  size?: Size;
  separator?: Separator;
  uppercase?: boolean;
} & OlHTMLAttributes<HTMLOListElement>;
