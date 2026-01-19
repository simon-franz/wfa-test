import Tabs from '@hrworks/sui-core/Tabs';
import { TabList } from '@hrworks/sui-core/Tabs/TabList/TabList';
import { observer } from 'mobx-react';
import { type ReactNode, useContext } from 'react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { WriteUpdate } from '../../../types/shared/BackendResponseType/UpdateTypes';
import type { TabsAdapterProps, TabsItemBackendDefinition } from './TabsAdapter.types';
import { TabAdapter } from './TabsItem/TabAdapter/TabAdapter';
import { TabPanelAdapter } from './TabsItem/TabPanelAdapter/TabPanelAdapter';
import type { TabPanelBackendDefinition } from './TabsItem/TabPanelAdapter/TabPanelAdapter.types';

export const TabsAdapter = observer(({ selectedItemSfId, items, id, ...otherProps }: TabsAdapterProps) => {
  const { applyUpdates, queueBackendPatches } = useContext(SmartFaceContext);
  const { defaultFullHeight } = useContext(DefaultValueContext);

  const _updateSelectedItemId = (_id: string) => {
    const update: WriteUpdate = {
      targetSfId: id,
      operation: 'write',
      path: 'props.selectedItemSfId',
      value: _id,
    };
    queueBackendPatches(id, [update]);
    applyUpdates([update]);
  };

  const tabs: ReactNode[] = [];
  const tabPanels: ReactNode[] = [];

  items?.forEach((item) => {
    const { props = {}, ...sharedBackendProps } = item;
    const { componentChildren, ...tabSpecificProps } = props;

    const tabBackendProps: TabsItemBackendDefinition = { ...sharedBackendProps, props: tabSpecificProps };
    const tabPanelBackendProps: TabPanelBackendDefinition = {
      ...sharedBackendProps,
      props: { componentChildren },
    };

    tabs.push(mapSmartFaceComponentPartsToAdapter(TabAdapter, [tabBackendProps]));
    tabPanels.push(mapSmartFaceComponentPartsToAdapter(TabPanelAdapter, [tabPanelBackendProps]));
  });

  return (
    <Tabs
      id={id}
      selectedItemId={selectedItemSfId}
      updateSelectedItemId={_updateSelectedItemId}
      fullHeight={defaultFullHeight}
      {...otherProps}
    >
      <TabList>{tabs}</TabList>
      {tabPanels}
    </Tabs>
  );
});
