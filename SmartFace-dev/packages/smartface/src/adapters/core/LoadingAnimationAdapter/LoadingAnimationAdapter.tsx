import LoadingAnimation from '@hrworks/sui-core/LoadingAnimation';
import { observer } from 'mobx-react';

import type { LoadingAnimationAdapterProps } from './LoadingAnimationAdapter.types';

export const LoadingAnimationAdapter = observer(({ type = 'shimmer', ...otherProps }: LoadingAnimationAdapterProps) => (
  <LoadingAnimation type={type} {...otherProps} />
));
