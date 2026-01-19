import Flexbox from '@hrworks/sui-core/Flexbox';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import type { FlexboxAdapterProps } from './FlexboxAdapter.types';
import { FlexboxItemAdapter } from './Item/FlexboxItemAdapter';

export const FlexboxAdapter = observer(({ items, ...otherProps }: FlexboxAdapterProps) => {
  const { defaultFullHeight } = useContext(DefaultValueContext);
  const children = mapSmartFaceComponentPartsToAdapter(FlexboxItemAdapter, items);

  return <Flexbox children={children} fullHeight={defaultFullHeight} {...otherProps} />;
});
