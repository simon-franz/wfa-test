import isNil from 'lodash/isNil';
import { type FocusEvent, type InputHTMLAttributes, useCallback, useState } from 'react';
import { IMaskInput } from 'react-imask';

import InputField from '../InputField';
import type { NumberInputFieldProps } from './NumberInputField.types';

export const NumberInputField = ({
  ref,
  defaultValue,
  id,
  name,
  onBlur,
  onFocus,
  onValueChange,
  onValueChangeFinished,
  size = 'medium',
  value,
  label,
  helpText,
  placeholder,
  validationState,
  validationMessage,
  disabled,
  thousandsSeparator = '',
  signed = true,
  readOnly,
  mandatory,
  ...otherProps
}: NumberInputFieldProps) => {
  const [isInputFocused, setInputFocused] = useState(false);
  const [valueOnFocus, setValueOnFocus] = useState('');
  const [inputValue, setInputValue] = useState(defaultValue);

  const _onBlur = useCallback(
    (event: FocusEvent<HTMLInputElement, Element>) => {
      const value = event.target.dataset.getFormDataUnmasked || '';
      setInputFocused(false);

      if (valueOnFocus !== value) {
        onValueChangeFinished && onValueChangeFinished(value);
      }
      onBlur && onBlur(event);
    },
    [onBlur, onValueChangeFinished, valueOnFocus],
  );

  const _onFocus = useCallback(
    (event: FocusEvent<HTMLInputElement, Element>) => {
      setInputFocused(true);
      setValueOnFocus(event.target.value);
      onFocus && onFocus(event);
    },
    [onFocus],
  );

  const onAccept = useCallback(
    (_value: string) => {
      onValueChange?.(_value);
      isNil(value) && setInputValue(_value);
    },
    [onValueChange, value],
  );

  const getInputProps = (id: string): InputHTMLAttributes<HTMLInputElement> =>
    ({
      autoComplete: 'off',
      defaultValue:
        (typeof defaultValue === 'string' || typeof defaultValue === 'number') && !value ? defaultValue : undefined,
      id,
      inputMode: 'numeric',
      name,
      onBlur: _onBlur,
      onFocus: _onFocus,
      placeholder,
      readOnly,
      value: value || inputValue,
      ...otherProps,
    } as const);

  return (
    <InputField
      label={label}
      placeholder={placeholder}
      hasInputFocus={isInputFocused}
      hasInputValue={!!(value || inputValue)}
      helpText={helpText}
      readOnly={readOnly}
      size={size}
      mandatory={mandatory}
      validationMessage={validationMessage}
      validationState={validationState}
      disabled={disabled}
      input={({ id, inputStyles }) => (
        <IMaskInput
          inputRef={ref}
          mask={Number}
          signed={signed}
          css={inputStyles}
          thousandsSeparator={thousandsSeparator}
          unmask
          data-get-form-data-unmasked={value}
          onAccept={onAccept}
          disabled={disabled}
          {...getInputProps(id)}
        />
      )}
    />
  );
};
