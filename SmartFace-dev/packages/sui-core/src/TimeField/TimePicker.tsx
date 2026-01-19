import { observer } from 'mobx-react';
import { forwardRef, useCallback, useEffect, useMemo } from 'react';

import { S } from './TimePicker.styles';
import type { TimePickerProps } from './TimePicker.types';
import { TimePickerButton } from './TimePickerButton/TimePickerButton';

export const TimePicker = observer(
  forwardRef<HTMLDivElement, TimePickerProps>(
    ({ value = '', onChange, showSeconds, timePickerMinutesStepSize, mobile, ...otherProps }, ref) => {
      const hours = useMemo(() => {
        const hours = Number.parseInt(value.split(':')[0], 10);

        return Number.isNaN(hours) ? new Date().getHours() : hours;
      }, [value]);

      const minutes = useMemo(() => {
        const minutes = Number.parseInt(value.split(':')[1], 10);

        return Number.isNaN(minutes) ? new Date().getMinutes() : minutes;
      }, [value]);

      const seconds = useMemo(() => {
        const seconds = Number.parseInt(value.split(':')[2], 10);

        return Number.isNaN(seconds) ? 0 : seconds;
      }, [value]);

      useEffect(() => {
        onChange(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}${
            showSeconds ? `:${String(seconds).padStart(2, '0')}` : ''
          }`,
        );
      }, [hours, minutes, seconds, onChange, showSeconds]);

      const incrementHours = useCallback(() => {
        onChange(
          `${String(hours < 23 ? hours + 1 : 0).padStart(2, '0')}:${String(minutes).padStart(2, '0')}${
            showSeconds ? `:${String(seconds).padStart(2, '0')}` : ''
          }`,
        );
      }, [hours, minutes, seconds, onChange, showSeconds]);

      const decrementHours = useCallback(() => {
        onChange(
          `${String(hours > 0 ? hours - 1 : 23).padStart(2, '0')}:${String(minutes).padStart(2, '0')}${
            showSeconds ? `:${String(seconds).padStart(2, '0')}` : ''
          }`,
        );
      }, [hours, minutes, seconds, onChange, showSeconds]);

      const incrementMinutes = useCallback(() => {
        const newMinutes = minutes - (minutes % timePickerMinutesStepSize) + timePickerMinutesStepSize;
        const newHours = newMinutes < 60 ? hours : hours + 1 <= 23 ? hours + 1 : 0;

        onChange(
          `${String(newHours).padStart(2, '0')}:${String(newMinutes < 60 ? newMinutes : newMinutes % 60).padStart(
            2,
            '0',
          )}${showSeconds ? ':00' : ''}`,
        );
      }, [hours, minutes, onChange, timePickerMinutesStepSize, showSeconds]);

      const decrementMinutes = useCallback(() => {
        const restMinutes = minutes % timePickerMinutesStepSize;
        const newMinutes = minutes - (restMinutes > 0 ? restMinutes : timePickerMinutesStepSize);
        const newHours = newMinutes >= 0 ? hours : hours - 1 >= 0 ? hours - 1 : 23;

        onChange(
          `${String(newHours).padStart(2, '0')}:${String(
            newMinutes >= 0 ? newMinutes : 60 - ((newMinutes * -1) % 60),
          ).padStart(2, '0')}${showSeconds ? ':00' : ''}`,
        );
      }, [hours, minutes, onChange, timePickerMinutesStepSize, showSeconds]);

      const incrementSeconds = useCallback(() => {
        onChange(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
            seconds < 59 ? seconds + 1 : 0,
          ).padStart(2, '0')}`,
        );
      }, [hours, minutes, seconds, onChange]);

      const decrementSeconds = useCallback(() => {
        onChange(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
            seconds > 0 ? seconds - 1 : 59,
          ).padStart(2, '0')}`,
        );
      }, [hours, minutes, seconds, onChange]);

      return (
        <S.Container mobile={mobile} ref={ref} showSeconds={showSeconds} {...otherProps}>
          <TimePickerButton mobile={mobile} direction="up" onClick={incrementHours} />
          <TimePickerButton mobile={mobile} direction="up" onClick={incrementMinutes} />
          {showSeconds && <TimePickerButton mobile={mobile} direction="up" onClick={incrementSeconds} />}
          <S.Number>{String(hours).padStart(2, '0')}</S.Number>
          <S.Number>{String(minutes).padStart(2, '0')}</S.Number>
          {showSeconds && <S.Number>{String(seconds).padStart(2, '0')}</S.Number>}
          <TimePickerButton mobile={mobile} direction="down" onClick={decrementHours} />
          <TimePickerButton mobile={mobile} direction="down" onClick={decrementMinutes} />
          {showSeconds && <TimePickerButton mobile={mobile} direction="down" onClick={decrementSeconds} />}
        </S.Container>
      );
    },
  ),
);
