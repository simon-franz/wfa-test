import { SqwSupportMenu } from '@hrworks/sui-extension/SqwSupportMenu';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentsToAdapters } from '../../../../main/components/ComponentMapper';
import type { SqwSupportMenuAdapterProps } from './SqwSupportMenuAdapter.types';

export const SqwSupportMenuAdapter = observer(({ componentChildren, ...otherProps }: SqwSupportMenuAdapterProps) => {
  const children = mapSmartFaceComponentsToAdapters(componentChildren);

  return <SqwSupportMenu children={children} {...otherProps} />;
});
