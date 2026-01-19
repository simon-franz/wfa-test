import List from '@hrworks/sui-core/List';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { ListItemAdapter } from './Item';
import type { ListAdapterProps } from './ListAdapter.types';

export const ListAdapter = observer(({ items, ...otherProps }: ListAdapterProps) => {
  const children = mapSmartFaceComponentPartsToAdapter(ListItemAdapter, items);

  return <List children={children} {...otherProps} />;
});
