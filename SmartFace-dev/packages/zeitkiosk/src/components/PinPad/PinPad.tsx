'use client';

import FontAwesomeIcon from '@hrworks/sui-core/FontAwesomeIcon';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import { startStopWorkingTime } from '../../data-access/startStopWorkingTime';
import { BackButton } from '../BackButton';
import { ClockInMethodSelectorContext } from '../ClockInMethodSelector/ClockInMethodSelectorContext';
import { PinInputConsole } from '../PinInputConsole';
import { ClockInPanel } from './ClockInPanel/ClockInPanel';
import { S } from './PinPad.styles';
import type { PinPadProps } from './PinPad.types';
import { PinPadContext } from './PinPadContext';

export const PinPad = (props: PinPadProps) => {
  const t = useTranslations('pinPad');

  const [pinValue, setPinValue] = useState('');
  const { selectedUser } = useContext(ClockInMethodSelectorContext);

  useEffect(() => {
    setPinValue('');
  }, [selectedUser?.userId]);

  const onClick = async (action: string) => {
    // TODO: PIN-validation
    // TODO: POST clockin-/clockout-time
    // TODO: trigger confirmation modal
    const response = await startStopWorkingTime(action);
    console.log('response', response);
  };

  return (
    <PinPadContext.Provider value={{ setPinValue, pinValue }}>
      <BackButton />
      <S.PinPadContainer {...props}>
        <ClockInPanel />
        <PinInputConsole />
        <S.ButtonContainer>
          <S.Button
            onClick={() => onClick('clockIn')}
            leftIcon={<FontAwesomeIcon variant="regular" name="play" />}
            color="success"
          >
            {t('clockInButtonText')}
          </S.Button>
          <S.Button
            onClick={() => onClick('clockOut')}
            leftIcon={<FontAwesomeIcon variant="regular" name="pause" />}
            color="danger"
          >
            {t('clockOutButtonText')}
          </S.Button>
        </S.ButtonContainer>
      </S.PinPadContainer>
    </PinPadContext.Provider>
  );
};
