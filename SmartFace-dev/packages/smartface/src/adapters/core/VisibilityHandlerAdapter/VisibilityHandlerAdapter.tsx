import VisibilityHandler from '@hrworks/sui-core/VisibilityHandler';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import type { VisibilityHandlerAdapterProps } from './VisibilityHandlerAdapter.types';

export const VisibilityHandlerAdapter = observer(
  ({ componentChildren, ...otherProps }: VisibilityHandlerAdapterProps) => {
    const children = mapSmartFaceComponentsToAdapters(componentChildren);

    return <VisibilityHandler children={children} {...otherProps} />;
  },
);
