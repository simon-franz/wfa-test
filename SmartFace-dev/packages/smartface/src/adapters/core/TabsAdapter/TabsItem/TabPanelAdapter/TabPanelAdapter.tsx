import { TabPanel } from '@hrworks/sui-core/Tabs/TabPanel/TabPanel';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentsToAdapters } from '../../../../../main/components/ComponentMapper/mapSmartFaceComponentsToAdapters';
import type { TabPanelAdapterProps } from './TabPanelAdapter.types';

export const TabPanelAdapter = observer(({ componentChildren, ...otherProps }: TabPanelAdapterProps) => {
  const children = mapSmartFaceComponentsToAdapters(componentChildren);

  return <TabPanel children={children} {...otherProps} />;
});
