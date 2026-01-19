import { observer } from 'mobx-react';
import { forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';

import Button from '../../Button';
import Icon from '../../Icon';
import InputField from '../../InputField';
import { type ComboBoxInputProps, ComboBoxValueBadge, HeadlessComboBoxContext, useComboBoxInput } from '../';
import { S } from './ComboBoxInput.styles';

export const ComboBoxInput = observer(
  forwardRef<HTMLInputElement, ComboBoxInputProps>(
    (
      {
        id,
        mandatory,
        validationMessage,
        validationState,
        clearValueOnFocus,
        refs,
        label,
        placeholder,
        noBlur,
        helpText,
        size,
        isDropdown,
        getResultMinLength,
        ...otherProps
      },
      ref,
    ) => {
      const inputRef = useRef<HTMLInputElement>(null);
      const mouseDownRef = useRef(false);
      const [hasModalOpenedOnce, setHasModalOpenedOnce] = useState(false);

      const {
        clearable,
        comboBoxValue,
        disabled,
        focusedValueId,
        setFocusedValueId,
        isInputFocused,
        readOnly,
        value,
        clear,
        onKeyDown,
        setIsInputFocused,
        ...comboBoxInputProps
      } = useComboBoxInput(inputRef, refs, noBlur, clearValueOnFocus);
      const { alwaysOpenOnFocus, setOpen, open } = useContext(HeadlessComboBoxContext);
      const [isTabActive, setIsTabActive] = useState(true);

      useEffect(() => {
        const onTabActivityChange = () => {
          if (document.hidden) {
            setIsTabActive(false);
          }
        };

        const handleFocus = () => {
          setHasModalOpenedOnce(true);
        };

        document.addEventListener('visibilitychange', onTabActivityChange);
        window.addEventListener('focus', handleFocus);

        return () => {
          document.removeEventListener('visibilitychange', onTabActivityChange);
          window.removeEventListener('focus', handleFocus);
        };
      }, []);

      const handleInteraction = useCallback(
        (isClickEvent?: boolean) => {
          if (!isTabActive) {
            setIsTabActive(true);

            return;
          }

          // Get Caret Back
          if (focusedValueId !== null) {
            setFocusedValueId(null);

            return;
          }

          // Toggle functionallity for dropdown
          if (isClickEvent && open && isDropdown) {
            setOpen(false);

            return;
          }

          inputRef.current?.focus();

          if (isClickEvent ? !open : alwaysOpenOnFocus && !hasModalOpenedOnce) {
            setOpen(true);
            !isDropdown && setHasModalOpenedOnce(true);
          }
        },
        [
          isTabActive,
          focusedValueId,
          open,
          isDropdown,
          alwaysOpenOnFocus,
          hasModalOpenedOnce,
          setFocusedValueId,
          setOpen,
        ],
      );

      const onWrapperFocus = useCallback(() => {
        if (!mouseDownRef.current) {
          setIsInputFocused(true);
          handleInteraction();
        }
      }, [handleInteraction, setIsInputFocused]);

      const onClick = useCallback(() => {
        handleInteraction(true);
      }, [handleInteraction]);

      const onBlur = useCallback(() => {
        if (!open) {
          setHasModalOpenedOnce(false);
          setOpen(false);
        }
      }, [open, setOpen]);

      const onMouseDown = useCallback(() => {
        mouseDownRef.current = true;
        // Reset the flag after the event cycle
        setTimeout(() => {
          mouseDownRef.current = false;
        }, 0);
      }, []);

      const isMulti = Array.isArray(comboBoxValue);

      return (
        <InputField
          id={id}
          label={label}
          placeholder={placeholder}
          hasInputFocus={isInputFocused}
          hasInputValue={!!value || (isMulti && comboBoxValue.length > 0)}
          helpText={helpText}
          readOnly={readOnly}
          size={size}
          mandatory={mandatory}
          validationMessage={validationMessage}
          validationState={validationState}
          disabled={disabled}
          hasButton={clearable}
          onBlur={onBlur}
          input={({ id, inputStyles, buttonStyles }) => (
            <>
              <S.InputWrapper
                ref={ref}
                tabIndex={disabled ? undefined : -1}
                disabled={disabled}
                onFocus={onWrapperFocus}
                onMouseDown={onMouseDown}
                onKeyDown={onKeyDown}
                onClick={onClick}
                inputStyles={inputStyles}
              >
                {isMulti &&
                  comboBoxValue.map(({ id, text }) => (
                    <ComboBoxValueBadge key={id} id={id} size={size} text={text} focused={focusedValueId === id} />
                  ))}
                <S.Input
                  autoComplete="off"
                  id={id}
                  ref={inputRef}
                  isBadgeFocused={focusedValueId}
                  isInputFocused={isInputFocused}
                  placeholder={placeholder}
                  data-get-form-data-ignore
                  readOnly={readOnly}
                  value={value}
                  disabled={disabled}
                  spellCheck={false}
                  {...comboBoxInputProps}
                  {...otherProps}
                />
              </S.InputWrapper>
              {clearable && (
                <Button
                  css={buttonStyles}
                  disabled={readOnly || disabled}
                  onClick={clear}
                  variant="unstyled"
                  tabIndex={-1}
                >
                  <Icon name="combo-box-clear" />
                </Button>
              )}
            </>
          )}
        />
      );
    },
  ),
);
