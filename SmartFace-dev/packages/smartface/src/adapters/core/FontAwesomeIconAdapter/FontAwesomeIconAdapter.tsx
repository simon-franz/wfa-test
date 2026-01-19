import FontAwesomeIcon from '@hrworks/sui-core/FontAwesomeIcon';
import { observer } from 'mobx-react';

import type { FontAwesomeIconAdapterProps } from './FontAwesomeIconAdapter.types';

export const FontAwesomeIconAdapter = observer(({ name = 'bug', ...otherProps }: FontAwesomeIconAdapterProps) => (
  <FontAwesomeIcon name={name} {...otherProps} />
));
