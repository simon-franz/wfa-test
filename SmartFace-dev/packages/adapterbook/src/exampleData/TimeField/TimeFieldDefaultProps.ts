import { addNotification } from '../../utils/eventFunctions/addNotification';
import { preset } from '../../utils/preset';
import { defaultFontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIconDefaultProps';
import type { TimeFieldBackendProps } from '@hrworks/smartface/adapters/core/TimeFieldAdapter/TimeFieldAdapter.types';

export const timeFieldDefaultProps: TimeFieldBackendProps = {
  ...preset.formDefaultProps,
  presentation: 'dropdown',
  showSeconds: true,
  timePickerMinutesStepSize: 5,
  timePickerToggleIcon: defaultFontAwesomeIcon(),
  onValueChange: [addNotification()],
};
