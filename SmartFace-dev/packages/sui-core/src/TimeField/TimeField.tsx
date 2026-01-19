import { useMediaQuery } from '@hrworks/design-system';
import { LocalizationContext } from '@hrworks/localization';
import { Float } from '@hrworks/sui-shared/components/Float';
import { containsMaskCharacters } from '@hrworks/sui-shared/functions/dateFunctions';
import { isValidTimeString } from '@hrworks/sui-shared/functions/validateTimeString';
import { usePrevious } from '@hrworks/sui-shared/hooks/usePrevious';
import type { FloatingValidation, Validation } from '@hrworks/types/shared/UiTypes';
import { FocusTrap } from 'focus-trap-react';
import { MaskedRange } from 'imask';
import isNil from 'lodash/isNil';
import { observer } from 'mobx-react';
import {
  type ChangeEvent,
  type FocusEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IMaskInput } from 'react-imask';

import Button from '../Button';
import ConfirmationModal from '../ConfirmationModal';
import Icon from '../Icon';
import InputField from '../InputField';
import type { TimeFieldProps } from './TimeField.types';
import { TimePicker } from './TimePicker';

export const TimeField = observer(
  ({
    defaultValue,
    helpText,
    id,
    label,
    name,
    disabled,
    onValueChange,
    onValueChangeFinished,
    readOnly,
    placeholder,
    size = 'medium',
    timePickerToggleIcon,
    timePickerMinutesStepSize = 15,
    validationMessage,
    validationState,
    value,
    mandatory,
    presentation: presentationFromProps,
    showSeconds,
    ref,
    ...otherProps
  }: TimeFieldProps) => {
    const { translate } = useContext(LocalizationContext);
    const format = showSeconds ? 'hh:mm:ss' : 'hh:mm';
    const isTouchDevice = useMediaQuery('isTouchDevice');

    const [inputValue, setInputValue] = useState(defaultValue);
    const controlledValue = isNil(value) ? inputValue : value;

    const [hasInputFocus, setHasInputFocus] = useState(false);
    const [valueOnFocus, setValueOnFocus] = useState('');
    const [isInvalidInput, setIsInvalidInput] = useState(false);
    const [isMaxLengthInvalidInput, setIsMaxLengthInvalidInput] = useState(false);
    const [open, setOpen] = useState(false);
    const [tempTime, setTempTime] = useState<string | undefined>(undefined);

    const clickTrackerRef = useRef<HTMLDivElement>(null);
    const timePickerToggleRef = useRef<HTMLButtonElement>(null);
    const lastConfirmedValueRef = useRef(value);

    const prevOpen = usePrevious(open);
    const prevIsTouch = usePrevious(isTouchDevice);

    const presentation = useMemo(() => {
      return presentationFromProps || (isTouchDevice ? 'modal' : 'dropdown');
    }, [isTouchDevice, presentationFromProps]);

    useEffect(() => {
      if (!prevIsTouch && isTouchDevice) {
        onValueChange?.(lastConfirmedValueRef.current ?? '');
        setTempTime(undefined);
      }
    }, [isTouchDevice, onValueChange, prevIsTouch]);

    const presentationRef = useRef(presentation);
    useEffect(() => {
      presentationRef.current = presentation;
    }, [presentation]);

    const previousCursorPositionRef = useRef<number | null>(null);
    const onInputCapture = (event: ChangeEvent<HTMLInputElement>) => {
      previousCursorPositionRef.current = event.target.selectionStart;
    };

    const currentInputValueRef = useRef(format);
    const previousInputValueRef = useRef('');
    const onInput = (event: ChangeEvent<HTMLInputElement>) => {
      const isPrefilledValue = !containsMaskCharacters(event.target.value) && previousInputValueRef.current === '';
      previousInputValueRef.current = isPrefilledValue ? event.target.value : currentInputValueRef.current;
      currentInputValueRef.current = event.target.value;
      const hasTypedAValidKey = currentInputValueRef.current !== previousInputValueRef.current;

      if (hasTypedAValidKey) {
        setIsInvalidInput(false);
        setIsMaxLengthInvalidInput(false);

        return;
      }

      const currentCursorPosition = event.target.selectionStart;
      const cursorDidntMove = previousCursorPositionRef.current! > currentCursorPosition!;
      const endOfMaskReached = currentCursorPosition === format.length;

      setIsInvalidInput(cursorDidntMove && !endOfMaskReached);
      setIsMaxLengthInvalidInput(cursorDidntMove && endOfMaskReached);
    };

    const closeTimePicker = useCallback(() => {
      setOpen(false);
      setTempTime(undefined);
      if (!isTouchDevice) {
        lastConfirmedValueRef.current = value;
      }
    }, [isTouchDevice, value]);

    const closeTimePickerOnClickOutside = useCallback(
      (event: MouseEvent) => {
        open &&
          !timePickerToggleRef.current?.contains(event.target as Node) &&
          !clickTrackerRef.current?.contains(event.target as Node) &&
          closeTimePicker();
      },
      [open, closeTimePicker],
    );

    const closeTimePickerOnEscape = useCallback(
      (event: KeyboardEvent) => {
        if (open) {
          event.stopPropagation();
          event.key === 'Escape' && closeTimePicker();
        }
      },
      [open, closeTimePicker],
    );

    const onFocus = (event: FocusEvent<HTMLInputElement, Element>) => {
      setHasInputFocus(true);
      setValueOnFocus(event.target.value);
    };

    const onBlur = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        const { value: inputVal } = event.target;
        const timeMask = format;
        const timeIsMask = inputVal.toUpperCase() === timeMask.toUpperCase();

        setIsInvalidInput(false);
        setIsMaxLengthInvalidInput(false);
        setHasInputFocus(false);

        if (inputVal === valueOnFocus || (timeIsMask && !valueOnFocus)) {
          return;
        }

        const isTimeOnFocusValid =
          isValidTimeString(valueOnFocus) || valueOnFocus.toUpperCase() === format.toUpperCase();

        const hasValueChanged = inputVal !== valueOnFocus;

        if ((isValidTimeString(inputVal) && hasValueChanged) || (isTimeOnFocusValid && !isValidTimeString(inputVal))) {
          onValueChangeFinished?.(inputVal);
          if (isNil(value)) {
            setInputValue(inputVal);
          }
        }
      },
      [format, onValueChangeFinished, valueOnFocus, value],
    );

    const onChange = useCallback(
      (newValue: unknown) => {
        if (typeof newValue === 'string' && newValue !== tempTime) {
          setTempTime(newValue);
          if (presentationRef.current === 'dropdown') {
            onValueChange?.(newValue);
            isNil(value) && setInputValue(newValue);
          }
        }
      },
      [onValueChange, tempTime, value],
    );

    const onConfirm = useCallback(() => {
      if (tempTime) {
        onValueChange?.(tempTime);
        if (isNil(value)) {
          setInputValue(tempTime);
        }
        lastConfirmedValueRef.current = tempTime;
      }
      closeTimePicker();
    }, [closeTimePicker, onValueChange, tempTime, value]);

    const onCancel = useCallback(() => {
      closeTimePicker();
    }, [closeTimePicker]);

    const onAccept = (newValue: unknown) => {
      if (typeof newValue !== 'string') {
        return;
      }
      const valueOrEmptyString = newValue.toLowerCase() === format.toLowerCase() ? '' : newValue;
      onValueChange?.(valueOrEmptyString);
      isNil(value) && setInputValue(valueOrEmptyString);
      lastConfirmedValueRef.current = valueOrEmptyString;
    };

    const toggleTimePicker = useCallback(() => {
      if (!open) {
        setValueOnFocus(controlledValue ?? '');
        setTempTime(controlledValue ?? '');
      }
      setOpen(!open);
    }, [open, controlledValue]);

    const inputProps = useCallback(
      (id: string) => ({
        inputMode: 'decimal',
        autoComplete: 'off',
        defaultValue: typeof defaultValue === 'string' && isNil(value) ? defaultValue : undefined,
        id,
        name,
        disabled,
        onBlur,
        onFocus,
        placeholder,
        readOnly,
        value: typeof controlledValue === 'string' ? controlledValue : undefined,
        ...otherProps,
      }),
      [defaultValue, disabled, onBlur, name, otherProps, placeholder, readOnly, value, controlledValue],
    );

    const hasInputValue = useMemo(() => {
      return Boolean(controlledValue || defaultValue);
    }, [defaultValue, controlledValue]);

    useEffect(() => {
      if (!open && prevOpen && valueOnFocus !== controlledValue) {
        onValueChangeFinished?.(controlledValue ?? '');
        setValueOnFocus(controlledValue ?? '');
      }
    }, [onValueChangeFinished, open, prevOpen, controlledValue, valueOnFocus]);

    useEffect(() => {
      document.addEventListener('click', closeTimePickerOnClickOutside, { capture: true });
      document.addEventListener('keydown', closeTimePickerOnEscape, { capture: true });

      return () => {
        document.removeEventListener('click', closeTimePickerOnClickOutside, { capture: true });
        document.removeEventListener('keydown', closeTimePickerOnEscape, { capture: true });
      };
    }, [closeTimePickerOnClickOutside, closeTimePickerOnEscape, open]);

    useEffect(() => {
      if (typeof controlledValue === 'string') {
        const parts = controlledValue.split(':');
        if (showSeconds && parts.length === 2) {
          const newValue = `${controlledValue}:00`;
          onValueChange?.(newValue);
          isNil(value) && setInputValue(newValue);
        } else if (!showSeconds && parts.length === 3) {
          const newValue = parts.slice(0, 2).join(':');
          onValueChange?.(newValue);
          isNil(value) && setInputValue(newValue);
        }
      }
    }, [showSeconds, value, controlledValue, onValueChange]);

    const floatingValidations: FloatingValidation[] = [
      {
        text: translate('time-field-invalid-time'),
        hasError: () => isInvalidInput,
      },
      {
        text: translate('time-field-max-length'),
        hasError: () => isMaxLengthInvalidInput,
      },
    ];

    const validations = useMemo((): Validation[] => {
      return [
        {
          text: translate('time-field-invalid-time'),
          focused: true,
          hasError: (value) => !!value && !containsMaskCharacters(value) && !isValidTimeString(value),
        },
        {
          text: translate('time-field-incomplete-time'),
          hasError: (value) => !!value && containsMaskCharacters(value),
        },
      ];
    }, [translate]);

    return (
      <InputField
        label={label}
        placeholder={placeholder}
        hasInputFocus={hasInputFocus}
        hasInputValue={hasInputValue}
        helpText={helpText}
        readOnly={readOnly}
        size={size}
        mandatory={mandatory}
        validationMessage={validationMessage}
        validationState={validationState}
        disabled={disabled}
        hasButton
        validations={validations}
        value={controlledValue}
        floatingValidations={floatingValidations}
        input={({ id, inputStyles, buttonStyles }) => (
          <Float show={open && !disabled && !readOnly && presentation === 'dropdown'} placement="bottom-end">
            {({ anchorRef, floatRef, getFloatStyles }) => (
              <>
                <div ref={anchorRef}>
                  <IMaskInput
                    inputRef={ref}
                    mask={format}
                    overwrite
                    eager
                    blocks={{
                      hh: {
                        mask: MaskedRange,
                        from: 0,
                        to: 23,
                        placeholderChar: 'h',
                      },
                      mm: {
                        mask: MaskedRange,
                        from: 0,
                        to: 59,
                        placeholderChar: 'm',
                      },
                      ...(showSeconds && {
                        ss: {
                          mask: MaskedRange,
                          from: 0,
                          to: 59,
                          placeholderChar: 's',
                        },
                      }),
                    }}
                    autofix="pad"
                    lazy={(readOnly || !hasInputFocus) && !hasInputValue}
                    onAccept={onAccept}
                    data-input-type-time
                    css={inputStyles}
                    onInputCapture={onInputCapture}
                    onInput={onInput}
                    spellCheck="false"
                    {...inputProps(id)}
                  />

                  <Button
                    ref={timePickerToggleRef}
                    css={buttonStyles}
                    variant="unstyled"
                    disabled={disabled || readOnly}
                    onClick={toggleTimePicker}
                  >
                    {timePickerToggleIcon || <Icon name="time-field-clock" />}
                  </Button>
                </div>
                {open && (
                  <>
                    {presentation === 'dropdown' && (
                      <div ref={floatRef} style={getFloatStyles()}>
                        <FocusTrap
                          active={open}
                          focusTrapOptions={{
                            initialFocus: false,
                            allowOutsideClick: true,
                            clickOutsideDeactivates: true,
                          }}
                        >
                          <TimePicker
                            ref={clickTrackerRef}
                            timePickerMinutesStepSize={timePickerMinutesStepSize}
                            value={controlledValue}
                            onChange={onChange}
                            showSeconds={showSeconds}
                          />
                        </FocusTrap>
                      </div>
                    )}
                  </>
                )}
                <ConfirmationModal
                  size="auto"
                  title={label}
                  show={presentation === 'modal' && open}
                  ref={clickTrackerRef}
                  onConfirm={onConfirm}
                  onCancel={onCancel}
                  isConfirmEnabled={tempTime !== controlledValue}
                >
                  <TimePicker
                    timePickerMinutesStepSize={timePickerMinutesStepSize}
                    value={tempTime || controlledValue}
                    onChange={onChange}
                    showSeconds={showSeconds}
                    mobile
                  />
                </ConfirmationModal>
              </>
            )}
          </Float>
        )}
      />
    );
  },
);
