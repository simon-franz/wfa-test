import type { Color, Size } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type FortuneWheelProps = {
  color?: 'random' | 'alternating' | Color;
  maxSize?: Size;
  onSpinComplete?: (value: string) => void;
} & HTMLAttributes<HTMLDivElement>;
