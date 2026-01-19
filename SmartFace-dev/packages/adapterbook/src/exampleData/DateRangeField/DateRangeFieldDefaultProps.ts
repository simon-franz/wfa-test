import { addNotification } from '../../utils/eventFunctions/addNotification';
import { preset } from '../../utils/preset';
import type { DateRangeFieldBackendProps } from '@hrworks/smartface/adapters/core/DateRangeFieldAdapter/DateRangeFieldAdapter.types';

export const dateRangeFieldDefaultProps: DateRangeFieldBackendProps = {
  ...preset.formDefaultProps,
  ...preset.dateFieldDefaultProps,
  format: 'DDMMYYYY',
  onValueChange: [addNotification()],
  onEnterKeyDown: [addNotification()],
};
