import Grid from '@hrworks/sui-core/Grid';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import type { GridAdapterProps } from './GridAdapter.types';
import { GridItemAdapter } from './GridItemAdapter';

export const GridAdapter = observer(({ items, ...otherProps }: GridAdapterProps) => {
  const { defaultFullHeight } = useContext(DefaultValueContext);
  if (!items || items.length === 0) {
    return;
  }
  const children = mapSmartFaceComponentPartsToAdapter(GridItemAdapter, items);

  return <Grid children={children} fullHeight={defaultFullHeight} {...otherProps} />;
});
