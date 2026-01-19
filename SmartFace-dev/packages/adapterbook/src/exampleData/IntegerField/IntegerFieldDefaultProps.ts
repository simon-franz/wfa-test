import { addNotification } from '../../utils/eventFunctions/addNotification';
import { preset } from '../../utils/preset';
import type { IntegerFieldBackendProps } from '@hrworks/smartface/adapters/core/IntegerFieldAdapter/IntegerFieldAdapter.types';

export const integerFieldDefaultProps: IntegerFieldBackendProps = {
  ...preset.formDefaultProps,
  value: '42',
  min: 3,
  max: 45,

  onValueChange: [addNotification()],
  onEnterKeyDown: [addNotification()],
};
