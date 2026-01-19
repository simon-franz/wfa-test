import { observer } from 'mobx-react';

import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import UiHandler from '../../../main/components/UiHandler';
import type { UiHandlerAdapterProps } from './UiHandlerAdapter.types';

export const UiHandlerAdapter = observer(({ componentChildren, ...otherProps }: UiHandlerAdapterProps) => {
  const children = mapSmartFaceComponentsToAdapters(componentChildren);

  return <UiHandler children={children} {...otherProps} />;
});
