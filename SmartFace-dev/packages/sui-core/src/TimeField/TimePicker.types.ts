import type { HTMLAttributes } from 'react';

import type { TimeFieldProps } from './TimeField.types';

export type TimePickerProps = HTMLAttributes<HTMLDivElement> & {
  value: TimeFieldProps['value'];
  onChange: (value: Required<TimeFieldProps>['value']) => void;
  timePickerMinutesStepSize: Required<TimeFieldProps>['timePickerMinutesStepSize'];
  showSeconds?: boolean;
  mobile?: boolean;
};
