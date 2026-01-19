import type { ResponsiveAttribute, Visibility } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';
import type { IntRange } from 'type-fest';

export type GridItemSize = IntRange<1, 13> | 'default';

export type GridItemProps = {
  size?: ResponsiveAttribute<GridItemSize>;
  visible?: Visibility;
  offset?: ResponsiveAttribute<IntRange<0, 12>>;
} & HTMLAttributes<HTMLDivElement>;
