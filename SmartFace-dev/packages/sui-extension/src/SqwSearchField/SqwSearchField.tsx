import Button from '@hrworks/sui-core/Button';
import { StreamlineIcon } from '@hrworks/sui-core/StreamlineIcon';
import TextField from '@hrworks/sui-core/TextField';
import { observer } from 'mobx-react';

import type { SqwSearchFieldProps } from './SqwSearchField.types';

export const SqwSearchField = observer(({ disabled, onSearchClick, ...otherProps }: SqwSearchFieldProps) => (
  <TextField
    disabled={disabled}
    type="text"
    renderButton={(buttonStyles) => (
      <Button css={buttonStyles} disabled={disabled} onClick={onSearchClick} variant="unstyled">
        <StreamlineIcon name="search" />
      </Button>
    )}
    {...otherProps}
  />
));
