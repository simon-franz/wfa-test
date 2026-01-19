import type { Color } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type FortuneWheelItemProps = {
  color?: Color;
  text?: string;
  media?: ReactNode;
  index?: number;
} & HTMLAttributes<SVGElement>;
