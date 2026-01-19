import SizeHandler from '@hrworks/sui-core/SizeHandler';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import type { SizeHandlerAdapterProps } from './SizeHandlerAdapter.types';

export const SizeHandlerAdapter = observer(({ componentChildren, ...otherProps }: SizeHandlerAdapterProps) => {
  const children = mapSmartFaceComponentsToAdapters(componentChildren);

  return <SizeHandler children={children} {...otherProps} />;
});
