import FlexboxItem from '@hrworks/sui-core/FlexboxItem';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentsToAdapters } from '../../../../main/components/ComponentMapper';
import type { FlexboxItemAdapterProps } from './FlexboxItemAdapter.types';

export const FlexboxItemAdapter = observer(({ componentChildren, ...otherProps }: FlexboxItemAdapterProps) => {
  const children = mapSmartFaceComponentsToAdapters(componentChildren);

  return <FlexboxItem children={children} {...otherProps} />;
});
