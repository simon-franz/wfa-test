import type { Direction, ResponsiveAttribute, Size } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { PanelGroupItemBackendDefinition } from './PanelGroupItem/PanelGroupItemAdapter.types';

export type PanelGroupBackendProps = {
  direction?: ResponsiveAttribute<Direction>;
  items?: PanelGroupItemBackendDefinition[];
  fullHeight?: boolean;
  defaultThreshold?: Size;
};

export type PanelGroupBackendDefinition = SmartFaceBackendComponent<'PanelGroup', PanelGroupBackendProps>;

export type PanelGroupAdapterProps = SmartFaceAdapterPropsType<PanelGroupBackendDefinition>;
