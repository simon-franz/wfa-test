import { observer } from 'mobx-react';

import Icon from '../../Icon';
import { S } from './TimePickerButton.styles';
import type { TimePickerButtonProps } from './TimePickerButton.types';

export const TimePickerButton = observer(({ mobile, direction, ...otherProps }: TimePickerButtonProps) => (
  <S.TimePickerButton $mobile={mobile} variant="subtle" {...otherProps}>
    <Icon name={`time-picker-angle-${direction}`} />
  </S.TimePickerButton>
));
