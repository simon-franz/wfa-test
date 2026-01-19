import type { Color, Corner } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type AlertProps = {
  icon?: ReactNode;
  closeable?: boolean;
  corner?: Exclude<Corner, 'pill'>;
  text?: string;
  title?: string;
  color?: Color;
  onClose?: () => void;
} & HTMLAttributes<HTMLDivElement>;
