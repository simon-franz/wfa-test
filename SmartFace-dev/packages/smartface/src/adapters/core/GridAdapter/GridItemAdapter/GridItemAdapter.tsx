import GridItem from '@hrworks/sui-core/GridItem';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentsToAdapters } from '../../../../main/components/ComponentMapper';
import type { GridItemAdapterProps } from './GridItemAdapter.types';

export const GridItemAdapter = observer(({ componentChildren, ...otherProps }: GridItemAdapterProps) => {
  const children = mapSmartFaceComponentsToAdapters(componentChildren);

  return <GridItem children={children} {...otherProps} />;
});
