import { MaterialDesignIcon } from '@hrworks/sui-core/MaterialDesignIcon';
import { observer } from 'mobx-react';

import type { MaterialDesignIconAdapterProps } from './MaterialDesignIconAdapter.types';

export const MaterialDesignIconAdapter = observer(
  ({ name = 'bug_report', ...otherProps }: MaterialDesignIconAdapterProps) => (
    <MaterialDesignIcon name={name} {...otherProps} />
  ),
);
