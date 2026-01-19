import type { Color } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type SliderProps = {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  color?: Color;
  showTrack?: boolean;
  showTooltip?: boolean;
  onValueChange?: (value: number) => void;
  onValueChangeFinished?: () => void;
} & HTMLAttributes<HTMLDivElement>;
