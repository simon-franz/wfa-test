import ListItem from '@hrworks/sui-core/List/Item';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { mapSmartFaceComponentsToAdapters } from '../../../../main/components/ComponentMapper';
import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import type { ListItemAdapterProps } from './ListItemAdapter.types';

export const ListItemAdapter = observer(({ id, componentChildren, onClick, ...otherProps }: ListItemAdapterProps) => {
  const { applyEvents } = useContext(SmartFaceContext);

  const _onClick = onClick && (() => applyEvents(onClick));

  return (
    <ListItem
      key={id}
      id={id}
      children={mapSmartFaceComponentsToAdapters(componentChildren)}
      onClick={_onClick}
      {...otherProps}
    />
  );
});
