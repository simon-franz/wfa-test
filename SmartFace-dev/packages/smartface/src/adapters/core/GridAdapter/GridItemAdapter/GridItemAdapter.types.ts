import type { ResponsiveAttribute, Visibility } from '@hrworks/types/shared/UiTypes';
import type { IntRange } from 'type-fest';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../types/SmartFaceComponentsType';

export type GridItemBackendProps = {
  componentChildren: SmartFaceComponentsType[];
  size?: ResponsiveAttribute<IntRange<1, 13> | 'default'>;
  visible?: Visibility;
  offset?: ResponsiveAttribute<IntRange<0, 12>>;
};

export type GridItemBackendDefintion = SmartFaceBackendComponentPart<GridItemBackendProps>;

export type GridItemAdapterProps = SmartFaceAdapterPropsType<GridItemBackendDefintion>;
