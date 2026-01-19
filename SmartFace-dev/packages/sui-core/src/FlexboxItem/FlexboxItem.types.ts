import type { ResponsiveAttribute, Visibility } from '@hrworks/types/shared/UiTypes';
import type { CSSProperties, HTMLAttributes } from 'react';

export type FlexboxItemProps = {
  order?: ResponsiveAttribute<CSSProperties['order']>;
  flexGrow?: ResponsiveAttribute<CSSProperties['flexGrow']>;
  flexShrink?: ResponsiveAttribute<CSSProperties['flexShrink']>;
  flexBasis?: ResponsiveAttribute<CSSProperties['flexBasis']>;
  alignSelf?: ResponsiveAttribute<CSSProperties['alignSelf']>;
  visible?: Visibility;
} & HTMLAttributes<HTMLDivElement>;
