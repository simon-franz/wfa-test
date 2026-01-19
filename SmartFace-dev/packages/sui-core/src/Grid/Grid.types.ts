import type { Gap, ResponsiveAttribute } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

import type { GridItemProps } from '../GridItem/GridItem.types';

export type GridProps = {
  gap?: ResponsiveAttribute<Gap>;
  rowGap?: ResponsiveAttribute<Gap>;
  columnGap?: ResponsiveAttribute<Gap>;
  fullHeight?: boolean;
} & Pick<GridItemProps, 'size'> &
  HTMLAttributes<HTMLDivElement>;
