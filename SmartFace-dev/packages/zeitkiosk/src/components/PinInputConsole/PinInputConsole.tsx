'use client';

import { OTPInput } from 'input-otp';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { Keypad } from '../Keypad';
import { PinPadContext } from '../PinPad/PinPadContext';
import { S } from './PinInputConsole.styles';
import type { PinInputConsoleProps } from './PinInputConsole.types';
import { Slot } from './Slot/Slot';

export const PinInputConsole = (props: PinInputConsoleProps) => {
  const t = useTranslations('pinInputConsole');
  const { pinValue } = useContext(PinPadContext);

  return (
    <S.Container {...props}>
      <S.TextOtpInputContainer>
        <S.Text>{t('text')}</S.Text>
        <OTPInput
          inputMode="none"
          autoFocus
          value={pinValue}
          textAlign="center"
          maxLength={4}
          render={({ slots }) => (
            <S.OtpContainer>
              {slots.map((slot, idx) => (
                <Slot key={idx} index={idx} {...slot} />
              ))}
            </S.OtpContainer>
          )}
        />
      </S.TextOtpInputContainer>
      <Keypad />
    </S.Container>
  );
};
