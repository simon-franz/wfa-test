import { useMediaQuery } from '@hrworks/design-system';
import { ErrorHandlingContext, WARNING_CODES } from '@hrworks/error-handling';
import { LocalizationContext } from '@hrworks/localization';
import {
  containsMaskCharacters,
  formatDateToDateIso,
  formatDateToString,
  getDateMask,
  getToday,
  isAfterDate,
  isBeforeDate,
  isValidDate,
  parseIsoDate,
  parseIsoDateToMaskedDate,
  parseMaskedDateToIsoDate,
} from '@hrworks/sui-shared/functions/dateFunctions';
import { replacePlaceholder } from '@hrworks/sui-shared/functions/replacePlaceholder';
import type { FloatingValidation, Validation } from '@hrworks/types/shared/UiTypes';
import { addYears } from 'date-fns/addYears';
import { subYears } from 'date-fns/subYears';
import { observer } from 'mobx-react';
import {
  type ChangeEvent,
  type FocusEvent,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IMaskInput } from 'react-imask';

import InputField from '../InputField';
import { S } from './DateField.styles';
import type { DateFieldProps } from './DateField.types';
import { DatePicker } from './DatePicker/DatePicker';
import { DatePickerToggle } from './DatePickerToggle';
import { useDateFieldState } from './useDateFieldState';

export const DateField = observer(
  forwardRef<HTMLInputElement | null, DateFieldProps>(
    (
      {
        defaultValue,
        id,
        helpText,
        label,
        minValue: _minValue,
        maxValue: _maxValue,
        onValueChange,
        onValueChangeFinished,
        placeholder,
        disabled,
        readOnly,
        size = 'medium',
        validationMessage,
        validationState,
        value: _value,
        mandatory,
        format = 'DDMMYYYY',
        showMonthAndYearPicker = true,
        presentation: presentationFromProps,
        ...otherProps
      },
      ref,
    ) => {
      const { log } = useContext(ErrorHandlingContext);
      const { translate } = useContext(LocalizationContext);
      const today = getToday();
      const mask = getDateMask(format);
      const isTouchDevice = useMediaQuery('isTouchDevice');
      const presentation = useMemo(
        () => presentationFromProps || (isTouchDevice ? 'modal' : 'dropdown'),
        [isTouchDevice, presentationFromProps],
      );

      const { value, setValue, isControlled } = useDateFieldState(_value, defaultValue);

      const minValue = useMemo(() => {
        if (!_minValue) {
          return subYears(today, 100);
        }

        if (typeof _minValue === 'string' && isValidDate(parseIsoDate(_minValue))) {
          return parseIsoDate(_minValue);
        }

        if (typeof _minValue === 'number') {
          return subYears(today, _minValue);
        }

        return subYears(today, 100);
      }, [_minValue, today]);

      const maxValue = useMemo(() => {
        if (!_maxValue) {
          return addYears(today, 100);
        }

        if (typeof _maxValue === 'string' && isValidDate(parseIsoDate(_maxValue))) {
          return parseIsoDate(_maxValue);
        }

        if (typeof _maxValue === 'number') {
          return addYears(today, _maxValue);
        }

        return addYears(today, 100);
      }, [_maxValue, today]);

      const valueRangeValidation = useMemo((): { minValue: Date; maxValue: Date } => {
        if (minValue && typeof minValue === 'string' && !isValidDate(parseIsoDate(minValue))) {
          log({
            type: 'warning',
            code: WARNING_CODES.INVALID_DATE,
            message: 'The minValue you specified is invalid.',
          });
        }

        if (maxValue && typeof maxValue === 'string' && !isValidDate(parseIsoDate(maxValue))) {
          log({
            type: 'warning',
            code: WARNING_CODES.INVALID_DATE,
            message: 'The maxValue you specified is invalid.',
          });
        }

        return {
          minValue,
          maxValue,
        };
      }, [minValue, maxValue, log]);

      const isValueBeforeMinDate = useMemo((): boolean => {
        if (minValue == null) return false;

        return Boolean(value && isBeforeDate(parseIsoDate(value), valueRangeValidation.minValue));
      }, [minValue, value, valueRangeValidation.minValue]);

      const isValueAfterMaxDate = useMemo((): boolean => {
        if (maxValue == null) return false;

        return Boolean(value && isAfterDate(parseIsoDate(value), valueRangeValidation.maxValue));
      }, [maxValue, value, valueRangeValidation.maxValue]);

      const clickTrackerRef = useRef<HTMLDivElement | null>(null);
      const togglePickerButtonRef = useRef<HTMLDivElement | null>(null);

      const [hasInputFocus, setHasInputFocus] = useState(false);
      const [valueOnFocus, setValueOnFocus] = useState('');
      const [isPickerOpen, setIsPickerOpen] = useState(false);
      const [isInvalidInput, setIsInvalidInput] = useState(false);
      const [isMaxLengthInvalidInput, setIsMaxLengthInvalidInput] = useState(false);

      const [visibleMonth, setVisibleMonth] = useState(
        value == null ? undefined : isValidDate(parseIsoDate(value)) ? parseIsoDate(value) : undefined,
      );
      const [tempDate, setTempDate] = useState<string | undefined>(undefined);
      const [isValidSelection, setIsValidSelection] = useState(false);
      const [lastConfirmedValue, setLastConfirmedValue] = useState(value);

      const datePickerValue =
        tempDate && isValidSelection
          ? parseIsoDate(tempDate)
          : lastConfirmedValue
            ? parseIsoDate(lastConfirmedValue)
            : undefined;

      const changeVisibleMonth = useCallback((month?: Date) => {
        if (isValidDate(month)) {
          setVisibleMonth(month);
        }
      }, []);

      const togglePicker = useCallback(() => {
        if (!isPickerOpen) {
          setIsValidSelection(false);
          setTempDate(undefined);
        }
        setIsPickerOpen(!isPickerOpen);
      }, [isPickerOpen]);

      useEffect(() => {
        const closePickerOnClickOutside = (event: MouseEvent) => {
          if (
            isPickerOpen &&
            !togglePickerButtonRef.current?.contains(event.target as Node) &&
            !clickTrackerRef.current?.contains(event.target as Node)
          ) {
            setIsPickerOpen(false);
          }
        };

        const closePickerOnEscapePress = (event: KeyboardEvent) => {
          if (isPickerOpen && event.key === 'Escape') {
            event.stopPropagation();
            setIsPickerOpen(false);
          }
        };

        document.addEventListener('click', closePickerOnClickOutside, { capture: true });
        document.addEventListener('keydown', closePickerOnEscapePress, { capture: true });

        return () => {
          document.removeEventListener('click', closePickerOnClickOutside, { capture: true });
          document.removeEventListener('keydown', closePickerOnEscapePress, { capture: true });
        };
      }, [isPickerOpen]);

      useEffect(() => {
        if (value != null) {
          changeVisibleMonth(parseIsoDate(value));
        }
      }, [changeVisibleMonth, value]);

      const onFocus = (event: FocusEvent<HTMLInputElement, Element>) => {
        setHasInputFocus(true);
        setValueOnFocus(event.target.value);
      };

      const onBlur = useCallback(
        (event: FocusEvent<HTMLInputElement, Element>) => {
          const { value } = event.target;

          setHasInputFocus(false);
          setIsInvalidInput(false);
          setIsMaxLengthInvalidInput(false);
          const valueInRangeofMinMax = !isValueBeforeMinDate && !isValueAfterMaxDate;
          const isDateValid = isValidDate(parseIsoDate(parseMaskedDateToIsoDate(value, mask))) && valueInRangeofMinMax;

          const isDateOnFocusValid =
            isValidDate(parseIsoDate(parseMaskedDateToIsoDate(valueOnFocus, mask))) ||
            valueOnFocus.toUpperCase() === mask.toUpperCase();

          const hasValueChanged = value !== valueOnFocus;

          if ((isDateValid && hasValueChanged) || (isDateOnFocusValid && !isDateValid)) {
            onValueChangeFinished?.();
          }
        },
        [isValueAfterMaxDate, isValueBeforeMinDate, mask, onValueChangeFinished, valueOnFocus],
      );

      const onDoubleClick = (event: React.MouseEvent<HTMLInputElement>) => {
        (event.target as HTMLInputElement).select();
      };

      const previousCursorPositionRef = useRef<number | null>(null);
      const onInputCapture = (event: ChangeEvent<HTMLInputElement>) => {
        previousCursorPositionRef.current = event.target.selectionStart;
      };

      const currentInputValueRef = useRef(mask.toUpperCase());
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
        const endOfMaskReached = currentCursorPosition === mask.length;

        setIsInvalidInput(cursorDidntMove && !endOfMaskReached);
        setIsMaxLengthInvalidInput(cursorDidntMove && endOfMaskReached);
      };

      const onPickerChange = useCallback(
        (date?: Date, closePicker?: boolean) => {
          if (!date) {
            setIsValidSelection(false);

            return;
          }

          const dateAsString = formatDateToDateIso(date);

          if (value && dateAsString === value) {
            setIsValidSelection(false);

            return;
          }

          setIsValidSelection(true);
          if (presentation === 'modal') {
            setTempDate(dateAsString);

            return;
          }

          if (closePicker) {
            setIsPickerOpen(false);
          }

          setValue(dateAsString);
          if (isControlled) {
            onValueChange?.(dateAsString);
          }
          setLastConfirmedValue(dateAsString);
          queueMicrotask(() => onValueChangeFinished?.());
        },
        [isControlled, onValueChange, onValueChangeFinished, presentation, setValue, value],
      );

      const onConfirm = useCallback(() => {
        if (tempDate && isValidSelection) {
          setValue(tempDate);
          if (isControlled) {
            onValueChange?.(tempDate);
          }
          setLastConfirmedValue(tempDate);

          queueMicrotask(() => onValueChangeFinished?.());
        }
        setIsPickerOpen(false);
        setTempDate(undefined);
        setIsValidSelection(false);
      }, [tempDate, isValidSelection, setValue, isControlled, onValueChange, onValueChangeFinished]);

      const onCancel = useCallback(() => {
        setIsPickerOpen(false);
        setTempDate(undefined);
        setIsValidSelection(false);
      }, []);

      const onAccept = (value: string) => {
        const valueOrEmptyString = value.toLocaleLowerCase() === mask.toLocaleLowerCase() ? '' : value;
        const valueAsIsoDate = parseMaskedDateToIsoDate(valueOrEmptyString, mask);

        setValue(valueAsIsoDate);
        if (isControlled) {
          onValueChange?.(valueAsIsoDate);
        }
        setLastConfirmedValue(valueAsIsoDate);
      };

      const floatingValidations = useMemo((): FloatingValidation[] => {
        return [
          {
            text: translate('date-field-invalid-symbol'),
            hasError: () => isInvalidInput,
          },
          {
            text: translate('date-field-max-length'),
            hasError: () => isMaxLengthInvalidInput,
          },
        ];
      }, [isInvalidInput, isMaxLengthInvalidInput, translate]);

      const validations = useMemo((): Validation[] => {
        return [
          {
            text: translate('date-field-invalid-date'),
            focused: true,
            hasError: (value) => !!value && !containsMaskCharacters(value) && !isValidDate(parseIsoDate(value)),
          },
          {
            text: translate('date-field-incomplete-date'),
            hasError: (value) => !!value && containsMaskCharacters(value),
          },
          {
            text: replacePlaceholder(translate('date-field-before-min-date-1'), {
              '%1%': formatDateToString(valueRangeValidation.minValue, getDateMask(format)),
            }),
            focused: true,
            hasError: () => isValueBeforeMinDate,
          },
          {
            text: replacePlaceholder(translate('date-field-after-max-date-1'), {
              '%1%': formatDateToString(valueRangeValidation.maxValue, getDateMask(format)),
            }),
            focused: true,
            hasError: () => isValueAfterMaxDate,
          },
        ];
      }, [
        format,
        isValueAfterMaxDate,
        isValueBeforeMinDate,
        translate,
        valueRangeValidation.maxValue,
        valueRangeValidation.minValue,
      ]);

      const maskedDate = value == null ? undefined : parseIsoDateToMaskedDate(value, mask);
      const maskedDefaultValue = defaultValue == null ? undefined : parseIsoDateToMaskedDate(defaultValue, mask);
      const date = value == null ? null : parseIsoDate(value);
      const hasInputValue = Boolean(value || defaultValue);

      const calendar = useMemo(
        () => (
          <DatePicker
            value={datePickerValue}
            onDateChange={(date, close = true) => onPickerChange(date, close)}
            minValue={minValue}
            maxValue={maxValue}
            visibleMonth={visibleMonth}
            mode="single"
            size={size}
            showMonthAndYearPicker={showMonthAndYearPicker}
          />
        ),
        [datePickerValue, minValue, maxValue, visibleMonth, size, showMonthAndYearPicker, onPickerChange],
      );

      return (
        <InputField
          label={label}
          hasInputFocus={hasInputFocus}
          hasInputValue={hasInputValue}
          value={value}
          helpText={helpText}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          size={size}
          mandatory={mandatory}
          validationMessage={validationMessage}
          validationState={validationState}
          hasButton
          validations={validations}
          floatingValidations={floatingValidations}
          input={({ id, inputStyles, buttonStyles }) => (
            <S.InputContainer>
              <IMaskInput
                data-get-form-data-unmasked={
                  !isValueBeforeMinDate && !isValueAfterMaxDate && isValidDate(date) ? value : ''
                }
                data-get-form-data-mask={mask}
                inputRef={ref}
                id={id}
                css={inputStyles}
                disabled={disabled}
                readOnly={readOnly}
                mask={mask.replaceAll(/\W/g, '$&`')}
                blocks={{
                  yyyy: { mask: '0000', placeholderChar: 'Y' },
                  MM: { mask: '00', placeholderChar: 'M' },
                  dd: { mask: '00', placeholderChar: 'D' },
                }}
                autoComplete="off"
                eager
                overwrite
                lazy={(readOnly || !hasInputFocus) && !hasInputValue}
                placeholder={placeholder}
                onBlur={onBlur}
                onAccept={onAccept}
                onFocus={onFocus}
                onDoubleClick={onDoubleClick}
                value={maskedDate}
                defaultValue={maskedDefaultValue}
                onInputCapture={onInputCapture}
                onInput={onInput}
                {...otherProps}
              />
              <DatePickerToggle
                togglePicker={togglePicker}
                disabled={disabled}
                readOnly={readOnly}
                isPickerOpen={isPickerOpen}
                clickTrackerRef={clickTrackerRef}
                togglePickerButtonRef={togglePickerButtonRef}
                label={label}
                buttonStyles={buttonStyles}
                size={size}
                calendar={calendar}
                presentation={presentation}
                onConfirm={onConfirm}
                onCancel={onCancel}
                isValidSelection={isValidSelection}
              />
            </S.InputContainer>
          )}
        />
      );
    },
  ),
);
