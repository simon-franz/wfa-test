import { LocalizationContext } from '@hrworks/localization';
import { differenceInSeconds } from 'date-fns';
import { observer } from 'mobx-react';
import { useContext, useEffect, useState } from 'react';

import { S } from './SqwClockInButton.styles';
import type { SqwClockInButtonProps } from './SqwClockInButton.types';

export const SqwClockInButton = observer(
  ({
    projectOrActivityDropdown,
    label,
    projectOrActivityLabel,
    isActive,
    startDateTime,
    onClockIn,
    onClockOut,
    ...otherProps
  }: SqwClockInButtonProps) => {
    const { translate } = useContext(LocalizationContext);
    const [timeElapsed, setTimeElapsed] = useState('');

    useEffect(() => {
      let updateElapsedTimeInterval: string | number | NodeJS.Timeout | undefined;

      if (isActive && startDateTime) {
        const updateElapsedTime = () => {
          const now = new Date();
          const secondsDifference = differenceInSeconds(now, new Date(startDateTime));
          const elapsedHours = Math.floor(secondsDifference / 3600)
            .toString()
            .padStart(2, '0');
          const elapsedMinutes = Math.floor((secondsDifference % 3600) / 60)
            .toString()
            .padStart(2, '0');

          const formattedElapsedTime = `${elapsedHours}:${elapsedMinutes}`;

          formattedElapsedTime != timeElapsed && setTimeElapsed(formattedElapsedTime);
        };

        updateElapsedTime();
        updateElapsedTimeInterval = setInterval(updateElapsedTime, 1000);
      }

      return () => {
        updateElapsedTimeInterval && clearInterval(updateElapsedTimeInterval);
      };
    }, [startDateTime, isActive, timeElapsed]);

    const onClick = isActive ? onClockOut : onClockIn;
    const iconName = isActive ? 'controls-pause' : 'controls-play';
    const clockInLabelText = isActive ? label : translate('clock-in-button-clock-in');

    return (
      <S.Container isActive={isActive}>
        <S.Toggle onClick={onClick} isActive={isActive} {...otherProps}>
          <S.IconWrapper>
            <S.StreamlineIcon $isActive={isActive} name={iconName} />
          </S.IconWrapper>
          <S.Content hasDropdown={!!projectOrActivityDropdown}>
            <S.LabelContainer>
              {isActive && !!projectOrActivityLabel && (
                <S.BoldLabel title={projectOrActivityLabel}>{projectOrActivityLabel}</S.BoldLabel>
              )}
              <S.Label title={clockInLabelText}>{clockInLabelText}</S.Label>
            </S.LabelContainer>
            {isActive && <S.ElapsedTimeLabel>{timeElapsed}</S.ElapsedTimeLabel>}
          </S.Content>
        </S.Toggle>
        <S.DropdownWrapper>{projectOrActivityDropdown}</S.DropdownWrapper>
      </S.Container>
    );
  },
);
