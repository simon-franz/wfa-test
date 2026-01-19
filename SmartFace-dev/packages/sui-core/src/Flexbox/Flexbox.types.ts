import type { Gap, ResponsiveAttribute } from '@hrworks/types/shared/UiTypes';
import type { CSSProperties, HTMLAttributes } from 'react';

export type FlexboxProps = {
  fullHeight?: boolean;
  flexDirection?: ResponsiveAttribute<CSSProperties['flexDirection']>;
  flexWrap?: ResponsiveAttribute<CSSProperties['flexWrap']>;
  justifyContent?: ResponsiveAttribute<CSSProperties['justifyContent']>;
  alignItems?: ResponsiveAttribute<CSSProperties['alignItems']>;
  alignContent?: ResponsiveAttribute<CSSProperties['alignContent']>;
  gap?: ResponsiveAttribute<Gap>;
  columnGap?: ResponsiveAttribute<Gap>;
  rowGap?: ResponsiveAttribute<Gap>;
} & HTMLAttributes<HTMLDivElement>;
