import type { Color, Corner, Size, TextAlign } from '@hrworks/types/shared/UiTypes';
import type { ButtonHTMLAttributes, HTMLAttributeAnchorTarget, ReactNode } from 'react';

export type ButtonProps = {
  href?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  htmlTag?: 'a' | 'button';
  type?: 'button' | 'reset' | 'submit';
  corner?: Corner;
  color?: Color;
  size?: Size;
  textAlign?: TextAlign;
  variant?: 'filled' | 'subtle' | 'ghost' | 'text' | 'link' | 'unstyled';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  target?: HTMLAttributeAnchorTarget;
} & ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>;
