import { observer } from 'mobx-react';

import { ProgressCircular } from './Circular/ProgressCircular';
import { ProgressLinear } from './Linear/ProgressLinear';
import type { ProgressProps } from './Progress.types';

export const Progress = observer(({ presentation = 'linear', size = 'medium', ...otherProps }: ProgressProps) => (
  <>
    {presentation === 'circular' ? (
      <ProgressCircular {...otherProps} />
    ) : (
      <ProgressLinear size={size} {...otherProps} />
    )}
  </>
));
