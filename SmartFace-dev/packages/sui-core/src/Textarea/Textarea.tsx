import { mergeRefs } from '@hrworks/sui-shared/functions/mergeRefs';
import isNil from 'lodash/isNil';
import { observer } from 'mobx-react';
import { type ChangeEvent, type FocusEvent, useCallback, useRef, useState } from 'react';

import InputField from '../InputField';
import { S } from './Textarea.styles';
import type { TextareaProps } from './Textarea.types';
import { useResizableTextarea } from './useResizableTextarea/useResizableTextarea';

export const Textarea = observer(
  ({
    id,
    rows,
    defaultValue,
    resize = 'vertical',
    helpText,
    label,
    name,
    growsWithContent,
    onBlur,
    onFocus,
    onValueChange,
    onValueChangeFinished,
    readOnly,
    placeholder,
    size = 'medium',
    validationMessage,
    validationState,
    disabled,
    mandatory,
    value,
    spellCheck = false,
    onChange,
    ref,
    ...otherProps
  }: TextareaProps) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const valueOnFocus = useRef<undefined | string>('');
    const [inputValue, setInputValue] = useState(defaultValue);

    const _onBlur = (event: FocusEvent<HTMLTextAreaElement, Element>) => {
      setIsInputFocused(false);
      valueOnFocus.current !== event.target.value && onValueChangeFinished?.(event.target.value);
      onBlur?.(event);
    };

    const _onChange = useCallback(
      (event: ChangeEvent<HTMLTextAreaElement>) => {
        onValueChange?.(event.target.value);
        onChange?.(event);
        isNil(value) && setInputValue(event.target.value);
        if (!isInputFocused) {
          onValueChangeFinished?.(event.target.value);
        }
      },
      [onValueChange, onChange, value, isInputFocused, onValueChangeFinished],
    );

    const _onFocus = (event: FocusEvent<HTMLTextAreaElement, Element>) => {
      setIsInputFocused(true);
      valueOnFocus.current = event.target.value;
      onFocus?.(event);
    };

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useResizableTextarea({
      resize,
      textareaRef,
      growsWithContent,
      rows,
      value: inputValue || value,
    });

    return (
      <InputField
        label={label}
        placeholder={placeholder}
        hasInputFocus={isInputFocused}
        hasInputValue={!!(inputValue || value)}
        helpText={helpText}
        readOnly={readOnly}
        size={size}
        mandatory={mandatory}
        validationMessage={validationMessage}
        validationState={validationState}
        disabled={disabled}
        input={({ id, inputStyles }) => (
          <S.Textarea
            placeholder={placeholder}
            readOnly={readOnly}
            rows={rows}
            ref={mergeRefs(ref, textareaRef)}
            autoComplete="off"
            resize={resize}
            inputStyles={inputStyles}
            defaultValue={defaultValue}
            id={id}
            name={name}
            onBlur={_onBlur}
            onChange={_onChange}
            onFocus={_onFocus}
            disabled={disabled}
            value={inputValue || value}
            spellCheck={spellCheck}
            {...otherProps}
          />
        )}
      />
    );
  },
);
