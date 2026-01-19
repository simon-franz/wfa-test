import LoadingOverlay from '@hrworks/sui-core/LoadingOverlay';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import type { LoadingOverlayAdapterProps } from './LoadingOverlayAdapter.types';

export const LoadingOverlayAdapter = observer(
  ({ componentChildren, loading = true, ...otherProps }: LoadingOverlayAdapterProps) => {
    const children = mapSmartFaceComponentsToAdapters(componentChildren);

    return <LoadingOverlay loading={loading} children={children} {...otherProps} />;
  },
);
