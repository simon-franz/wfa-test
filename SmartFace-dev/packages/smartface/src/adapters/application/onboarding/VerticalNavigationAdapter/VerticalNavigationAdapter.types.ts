import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../../types/SmartFaceComponent';
import type { VerticalNavigationItemBackendDefinition } from './Item/VerticalNavigationItemAdapter.types';

export type VerticalNavigationBackendProps = {
  items?: VerticalNavigationItemBackendDefinition[];
  activeItemSfId?: string;
  preventNavigation?: boolean;
  onBeforeNavigation?: SfEventType;
  onAfterNavigation?: SfEventType;
};

export type VerticalNavigationBackendDefinition = SmartFaceBackendComponent<
  'VerticalNavigation',
  VerticalNavigationBackendProps
>;

export type VerticalNavigationAdapterProps = SmartFaceAdapterPropsType<VerticalNavigationBackendDefinition>;
