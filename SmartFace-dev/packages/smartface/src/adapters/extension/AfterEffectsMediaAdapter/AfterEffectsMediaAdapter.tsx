import { BlockUI } from '@hrworks/sui-core/BlockUI';
import { observer } from 'mobx-react';
import { lazy, Suspense } from 'react';

import type { AfterEffectsMediaAdapterProps } from './AfterEffectsMediaAdapter.types';

const AfterEffectsMedia = lazy(() => import('@hrworks/sui-extension/AfterEffectsMedia'));

export const AfterEffectsMediaAdapter = observer(({ url = '', ...otherProps }: AfterEffectsMediaAdapterProps) => (
  <Suspense fallback={<BlockUI isOpen />}>
    <AfterEffectsMedia url={url} {...otherProps} />
  </Suspense>
));
