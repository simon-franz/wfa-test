import type {
  Color,
  OnClickLinkProps,
  OverflowBehaviour,
  ResponsiveAttribute,
  Size,
  TextAlign,
} from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type TextProps = {
  variant?: 'default' | 'subtle';
  hover?: boolean;
  html?: boolean;
  fullWidth?: boolean;
  htmlTag?: 'div' | 'span';
  color?: Color;
  fontSize?: Size;
  fontWeight?: 'thin' | 'normal' | 'bold';
  underlined?: boolean;
  italic?: boolean;
  textAlign?: ResponsiveAttribute<TextAlign>;
  overflowBehaviour?: OverflowBehaviour;
} & OnClickLinkProps &
  HTMLAttributes<HTMLElement>;
