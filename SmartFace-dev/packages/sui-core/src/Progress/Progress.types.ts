import type { Color, Size } from '@hrworks/types/shared/UiTypes';

export type ProgressProps = {
  presentation?: 'linear' | 'circular';
  progress?: number;
  color?: Color;
  size?: Size;
  animated?: boolean;
};
