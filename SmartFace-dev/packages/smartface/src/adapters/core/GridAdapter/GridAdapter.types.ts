import type { Gap, ResponsiveAttribute } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { GridItemBackendDefintion, GridItemBackendProps } from './GridItemAdapter/GridItemAdapter.types';

export type GridBackendProps = {
  items: GridItemBackendDefintion[];
  gap?: ResponsiveAttribute<Gap>;
  rowGap?: ResponsiveAttribute<Gap>;
  columnGap?: ResponsiveAttribute<Gap>;
  fullHeight?: boolean;
} & Pick<GridItemBackendProps, 'size'>;

export type GridBackendDefinition = SmartFaceBackendComponent<'Grid', GridBackendProps>;

export type GridAdapterProps = SmartFaceAdapterPropsType<GridBackendDefinition>;
