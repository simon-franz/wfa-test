import type { Gap } from '@hrworks/types/shared/UiTypes';

import type {
  SmartFaceAdapterPropsType,
  SmartFaceBackendComponent,
  SmartFaceBackendComponentPart,
} from '../../../types/SmartFaceComponent';
import type { TabBackendProps } from './TabsItem/TabAdapter/TabAdapter.types';
import type { TabPanelBackendProps } from './TabsItem/TabPanelAdapter/TabPanelAdapter.types';

export type TabsBackendProps = {
  items: TabsItemBackendDefinition[];
  selectedItemSfId?: string;
  fullHeight?: boolean;
  contentGap?: Gap;
};

export type TabsBackendDefinition = SmartFaceBackendComponent<'Tabs', TabsBackendProps>;

export type TabsAdapterProps = SmartFaceAdapterPropsType<TabsBackendDefinition>;

export type TabsItemBackendProps = TabBackendProps & TabPanelBackendProps;

export type TabsItemBackendDefinition = SmartFaceBackendComponentPart<TabsItemBackendProps>;
