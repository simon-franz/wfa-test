import PortrayedList from '@hrworks/sui-extension/PortrayedList';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import PortrayedListItemAdapter from './ListItem';
import type { PortrayedListAdapterProps } from './PortrayedListAdapter.types';

export const PortrayedListAdapter = observer(({ items, ...otherProps }: PortrayedListAdapterProps) => {
  const children = mapSmartFaceComponentPartsToAdapter(PortrayedListItemAdapter, items);

  return <PortrayedList children={children} {...otherProps} />;
});
