import PanelGroup from '@hrworks/sui-extension/PanelGroup';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import type { PanelGroupAdapterProps } from './PanelGroupAdapter.types';
import { PanelGroupAdapterContext } from './PanelGroupAdapterContext';
import { PanelGroupItemAdapter } from './PanelGroupItem/PanelGroupItemAdapter';

export const PanelGroupAdapter = observer(({ items, ...otherProps }: PanelGroupAdapterProps) => {
  const { defaultFullHeight } = useContext(DefaultValueContext);

  if (!items || items.length === 0) {
    return null;
  }

  const children = mapSmartFaceComponentPartsToAdapter(PanelGroupItemAdapter, items);

  const lastItemSfId = items?.[items.length - 1]?.sfId;

  return (
    <PanelGroupAdapterContext.Provider value={{ lastItemSfId }}>
      <PanelGroup children={children} fullHeight={defaultFullHeight} {...otherProps} />
    </PanelGroupAdapterContext.Provider>
  );
});
