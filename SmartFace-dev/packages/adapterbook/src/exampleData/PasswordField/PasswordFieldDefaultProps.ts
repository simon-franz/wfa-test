import { addNotification } from '../../utils/eventFunctions/addNotification';
import { preset } from '../../utils/preset';
import type { PasswordFieldBackendProps } from '@hrworks/smartface/adapters/core/PasswordFieldAdapter/PasswordFieldAdapter.types';

export const passwordFieldDefaultProps: PasswordFieldBackendProps = {
  ...preset.formDefaultProps,
  allowShowPassword: true,
  onValueChange: [addNotification()],
};
