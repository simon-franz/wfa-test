import type { Direction, ResponsiveAttribute, Size } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type PanelGroupProps = {
  direction?: ResponsiveAttribute<Direction>;
  fullHeight?: boolean;
  defaultThreshold?: Size;
} & HTMLAttributes<HTMLDivElement>;
