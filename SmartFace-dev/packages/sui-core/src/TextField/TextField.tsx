import { observer } from 'mobx-react';
import { type ChangeEvent, type FocusEvent, forwardRef, useCallback, useState } from 'react';

import InputField from '../InputField';
import type { TextFieldProps } from './TextField.types';

export const TextField = observer(
  forwardRef<HTMLInputElement, TextFieldProps>(
    (
      {
        defaultValue,
        id,
        helpText,
        label,
        name,
        onBlur,
        onFocus,
        onValueChange,
        onValueChangeFinished,
        renderButton,
        placeholder,
        readOnly,
        size = 'medium',
        validationMessage,
        validationState,
        disabled,
        className,
        style,
        value,
        mandatory,
        validations,
        floatingValidations,
        spellCheck = false,
        onChange,
        ...otherProps
      },
      ref,
    ) => {
      const [isInputFocused, setInputFocused] = useState(false);
      const [valueOnFocus, setValueOnFocus] = useState('');
      const [hasUncontrolledInput, setHasUncontrolledInput] = useState(!!defaultValue);

      const _onBlur = useCallback(
        (event: FocusEvent<HTMLInputElement, Element>) => {
          setInputFocused(false);

          if (valueOnFocus !== event.target.value) {
            onValueChangeFinished?.(event.target.value);
          }
          onBlur?.(event);
        },
        [onBlur, onValueChangeFinished, valueOnFocus],
      );

      const _onChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
          onChange?.(event);
          onValueChange?.(event.target.value);
          setHasUncontrolledInput(!!event.target.value);
          if (!isInputFocused) {
            onValueChangeFinished?.(event.target.value);
          }
        },
        [isInputFocused, onChange, onValueChange, onValueChangeFinished],
      );

      const _onFocus = useCallback(
        (event: FocusEvent<HTMLInputElement, Element>) => {
          setInputFocused(true);
          setValueOnFocus(event.target.value);
          onFocus?.(event);
        },
        [onFocus],
      );

      return (
        <InputField
          label={label}
          placeholder={placeholder}
          hasInputFocus={isInputFocused}
          className={className}
          style={style}
          hasInputValue={!!value || hasUncontrolledInput}
          helpText={helpText}
          readOnly={readOnly}
          size={size}
          mandatory={mandatory}
          validationMessage={validationMessage}
          validationState={validationState}
          disabled={disabled}
          hasButton={Boolean(renderButton)}
          validations={validations}
          floatingValidations={floatingValidations}
          input={({ id, inputStyles, buttonStyles }) => (
            <>
              <input
                autoComplete="off"
                css={inputStyles}
                defaultValue={typeof defaultValue === 'string' && !value ? defaultValue : undefined}
                id={id}
                name={name}
                placeholder={placeholder}
                onBlur={_onBlur}
                onChange={_onChange}
                onFocus={_onFocus}
                readOnly={readOnly}
                value={typeof value === 'string' ? value : undefined}
                ref={ref}
                disabled={disabled}
                spellCheck={spellCheck}
                {...otherProps}
              />
              {renderButton?.(buttonStyles)}
            </>
          )}
        />
      );
    },
  ),
);
