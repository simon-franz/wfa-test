import type { Color, Corner, Size } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeProps = {
  anchor?: ReactNode;
  variant?: 'filled' | 'outlined';
  text?: string;
  corner?: Corner;
  size?: Size;
  dot?: boolean;
  color?: Color;
  fullWidth?: boolean;
  fixedSize?: boolean;
  animation?: 'none' | 'pulsing' | 'breathing' | 'flashing' | 'jumping';
} & HTMLAttributes<HTMLDivElement>;
