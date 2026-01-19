import { useTheme } from '@emotion/react';
import { autoUpdate, flip, hide, offset, useFloating } from '@floating-ui/react';
import type { Validation } from '@hrworks/types/shared/UiTypes';
import { observer } from 'mobx-react';
import { useEffect, useId, useRef, useState } from 'react';

import { FloatingValidation } from './FloatingValidation';
import { S } from './InputField.styles';
import type { InputFieldProps } from './InputField.types';

export const InputField = observer(
  ({
    input,
    hasInputFocus,
    hasInputValue,
    helpText,
    label,
    placeholder,
    validationMessage: _validationMessage,
    validationState: _validationState,
    mandatory,
    hasButton,
    size = 'medium',
    disabled,
    validations,
    floatingValidations,
    value,
    readOnly,
    setHtmlFor,
    ...otherProps
  }: InputFieldProps) => {
    const inputHtmlId = useId();
    const theme = useTheme();
    const prevValueRef = useRef(value);
    const wasInputManipulatedRef = useRef(false);
    const [_validations, set_Validations] = useState<Validation | undefined>();

    useEffect(() => {
      if (hasInputFocus) {
        if (value !== prevValueRef.current) wasInputManipulatedRef.current = true;
      } else {
        if (wasInputManipulatedRef.current) wasInputManipulatedRef.current = false;
      }
      set_Validations(
        hasInputFocus
          ? validations?.find(({ hasError, focused = false }) => {
              return (focused || !wasInputManipulatedRef.current) && hasError(value);
            })
          : validations?.find(({ hasError }) => hasError(value)),
      );
      prevValueRef.current = value;
    }, [hasInputFocus, validations, value]);

    const isLabelFloating = (hasInputFocus && !readOnly) || hasInputValue || Boolean(placeholder);
    const failedFloatingValidation = floatingValidations?.find(({ hasError }) => hasError(value));

    const validation = _validations
      ? ({ validationMessage: _validations.text, validationState: 'danger' } as const)
      : { validationMessage: _validationMessage, validationState: _validationState };

    const failedFloatingValidationText = failedFloatingValidation?.text;

    const { floatingStyles, refs, middlewareData, elements } = useFloating({
      placement: 'bottom',
      whileElementsMounted: autoUpdate,
      middleware: [flip(), offset({ mainAxis: theme.marko.variables.spacing.distance.extraSmall }), hide()],
    });

    return (
      <S.Container size={size} {...otherProps}>
        <S.InputContainer ref={refs.setReference}>
          {input({
            id: inputHtmlId,
            isLabelFloating: isLabelFloating,
            inputStyles: S.inputStyles(theme, validation.validationState, size, hasButton, disabled),
            buttonStyles: S.buttonStyles(theme, size, disabled),
          })}
          <S.Label
            disabled={disabled}
            hasInputFocus={hasInputFocus}
            isLabelFloating={isLabelFloating}
            size={size}
            htmlFor={setHtmlFor === false ? undefined : inputHtmlId}
            hasButton={hasButton}
            validationState={validation.validationState}
          >
            <S.LabelText>{label}</S.LabelText>
            {mandatory && <div>*</div>}
          </S.Label>
        </S.InputContainer>
        <FloatingValidation
          isVisible={hasInputFocus}
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            ...(middlewareData.hide?.referenceHidden && { display: 'none' }),
            width: elements.reference?.getBoundingClientRect().width,
          }}
          failedFloatingValidationText={failedFloatingValidationText}
        />
        <S.HelpText
          size={size}
          helpText={helpText}
          validationMessage={validation.validationMessage}
          validationState={validation.validationState}
        />
      </S.Container>
    );
  },
);
