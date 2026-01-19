import type { Gap, ResponsiveAttribute } from '@hrworks/types/shared/UiTypes';
import type { CSSProperties } from 'react';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { FlexboxItemBackendDefinition } from './Item/FlexboxItemAdapter.types';

export type FlexboxBackendProps = {
  items: FlexboxItemBackendDefinition[];
  fullHeight?: boolean;
  flexDirection?: ResponsiveAttribute<CSSProperties['flexDirection']>;
  flexWrap?: ResponsiveAttribute<CSSProperties['flexWrap']>;
  justifyContent?: ResponsiveAttribute<CSSProperties['justifyContent']>;
  alignItems?: ResponsiveAttribute<CSSProperties['alignItems']>;
  alignContent?: ResponsiveAttribute<CSSProperties['alignContent']>;
  gap?: ResponsiveAttribute<Gap>;
  columnGap?: ResponsiveAttribute<Gap>;
  rowGap?: ResponsiveAttribute<Gap>;
};

export type FlexboxBackendDefinition = SmartFaceBackendComponent<'Flexbox', FlexboxBackendProps>;

export type FlexboxAdapterProps = SmartFaceAdapterPropsType<FlexboxBackendDefinition>;
