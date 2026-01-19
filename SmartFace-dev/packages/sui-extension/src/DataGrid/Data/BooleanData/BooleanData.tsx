import Icon from '@hrworks/sui-core/Icon';
import { observer } from 'mobx-react';

import type { BooleanDataProps } from './BooleanData.types';

export const BooleanData = observer(({ value, ...otherProps }: BooleanDataProps) => {
  return value == null ? null : (
    <Icon name={value ? 'data-grid-boolean-true' : 'data-grid-boolean-false'} {...otherProps} />
  );
});
