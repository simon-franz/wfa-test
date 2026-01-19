import type { ResponsiveAttribute, Visibility } from '@hrworks/types/shared/UiTypes';
import type { CSSProperties } from 'react';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../types/SmartFaceComponentsType';

export type FlexboxItemBackendProps = {
  componentChildren: SmartFaceComponentsType[];
  order?: ResponsiveAttribute<CSSProperties['order']>;
  flexGrow?: ResponsiveAttribute<CSSProperties['flexGrow']>;
  flexShrink?: ResponsiveAttribute<CSSProperties['flexShrink']>;
  flexBasis?: ResponsiveAttribute<CSSProperties['flexBasis']>;
  alignSelf?: ResponsiveAttribute<CSSProperties['alignSelf']>;
  visible?: Visibility;
};

export type FlexboxItemBackendDefinition = SmartFaceBackendComponentPart<FlexboxItemBackendProps>;

export type FlexboxItemAdapterProps = SmartFaceAdapterPropsType<FlexboxItemBackendDefinition>;
