import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

import Button from '../Button';
import Icon from '../Icon';
import TextField from '../TextField';
import type { PasswordFieldProps } from './PasswordField.types';

export const PasswordField = observer(
  ({ allowShowPassword = true, disabled, size = 'medium', ...otherProps }: PasswordFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      if (!allowShowPassword || disabled) {
        setShowPassword(false);
      }
    }, [allowShowPassword, disabled]);

    return (
      <TextField
        size={size}
        disabled={disabled}
        type={showPassword && !disabled && allowShowPassword ? 'text' : 'password'}
        renderButton={
          allowShowPassword
            ? (buttonStyles) => (
                <Button
                  css={buttonStyles}
                  disabled={disabled}
                  onClick={() => setShowPassword(!showPassword)}
                  variant="unstyled"
                >
                  <Icon name={showPassword ? 'password-field-hide' : 'password-field-show'} />
                </Button>
              )
            : undefined
        }
        {...otherProps}
      />
    );
  },
);
