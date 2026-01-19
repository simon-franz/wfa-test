import { addNotification } from '../../utils/eventFunctions/addNotification';
import { preset } from '../../utils/preset';
import type { TextFieldBackendProps } from '@hrworks/smartface/adapters/core/TextFieldAdapter/TextFieldAdapter.types';

export const textFieldDefaultProps: TextFieldBackendProps = {
  ...preset.formDefaultProps,
  onValueChange: [addNotification()],
  onEnterKeyDown: [addNotification()],
};
