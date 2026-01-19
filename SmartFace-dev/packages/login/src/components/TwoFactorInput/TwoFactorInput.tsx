'use client';

import { OTPInput, type SlotProps } from 'input-otp';
import { useEffect, useState } from 'react';

import { S } from './TwoFactorInput.styles';
import type { TwoFactorInputProps } from './TwoFactorInput.types';

const Slot = ({
  char,
  placeholderChar,
  isActive,
  hasFakeCaret,
  hasError,
  ...props
}: SlotProps & { hasError?: boolean }) => {
  return (
    <S.Slot isActive={isActive} hasError={hasError} {...props}>
      <S.SlotChar>{char ?? placeholderChar}</S.SlotChar>
      {hasFakeCaret && <S.FakeCaret />}
    </S.Slot>
  );
};

export const TwoFactorInput = ({
  onComplete,
  onChange,
  disabled = false,
  hasError = false,
  errorMessage,
  clearInput = false,
  onClearComplete,
  autoFocus = true,
}: TwoFactorInputProps) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (clearInput) {
      setValue('');
      if (onClearComplete) {
        onClearComplete();
      }
    }
  }, [clearInput, onClearComplete]);

  const handleChange = (newValue: string) => {
    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }

    if (newValue.length === 6 && onComplete) {
      onComplete(newValue);
    }
  };

  return (
    <S.Container>
      <OTPInput
        value={value}
        onChange={handleChange}
        maxLength={6}
        disabled={disabled}
        autoFocus={autoFocus}
        // containerClassName={S.containerClassName}
        render={({ slots }) => (
          <S.InputContainer>
            <S.SlotGroup>
              {slots.map((slot, idx) => (
                <Slot key={idx} hasError={hasError} {...slot} />
              ))}
            </S.SlotGroup>
          </S.InputContainer>
        )}
      />
      {hasError && errorMessage && <S.ErrorMessage role="alert">{errorMessage}</S.ErrorMessage>}
    </S.Container>
  );
};
