// TODO: find a better solution to get types from button UI components without
// importing any SUI package (except shared)
import type { Color, Corner, Size, TextAlign } from '@hrworks/types/shared/UiTypes';
import type { ButtonHTMLAttributes, HTMLAttributeAnchorTarget, ReactNode } from 'react';

// Should be identical to Button.types.ts
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

// Should be identical to IconButton.types.ts
export type IconButtonProps = Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'fullWidth' | 'text'> &
  ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>;
