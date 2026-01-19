import { useMediaQuery } from '@hrworks/design-system';
import { ErrorHandlingContext, WARNING_CODES } from '@hrworks/error-handling';
import { LocalizationContext } from '@hrworks/localization';
import {
  containsMaskCharacters,
  formatDateToDateIso,
  formatDateToString,
  getDateMask,
  getDateRangeMask,
  getToday,
  isAfterDate,
  isBeforeDate,
  parseIsoDate,
  parseIsoDateRangeToMaskedDate,
  parseMaskedDateRangeToIsoDateRange,
} from '@hrworks/sui-shared/functions/dateFunctions';
import { replacePlaceholder } from '@hrworks/sui-shared/functions/replacePlaceholder';
import type { FloatingValidation, Validation } from '@hrworks/types/shared/UiTypes';
import { addYears, subYears } from 'date-fns';
import isEqual from 'lodash/isEqual';
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
import type { DateRange } from 'react-day-picker';
import { IMaskInput } from 'react-imask';

import { DatePicker } from '../DateField/DatePicker/DatePicker';
import { DatePickerToggle } from '../DateField/DatePickerToggle';
import InputField from '../InputField';
import { S } from './DateRangeField.styles';
import type { DateRangeFieldProps } from './DateRangeField.types';
import { useDateRangeFieldState } from './useDateRangeFieldState';

export const DateRangeField = observer(
  ({
    ref,
    defaultValue,
    label,
    value: _value,
    helpText,
    placeholder,
    disabled,
    readOnly,
    onValueChange,
    onValueChangeFinished,
    size = 'medium',
    mandatory,
    validationMessage,
    validationState,
    minValue,
    maxValue,
    format = 'DDMMYYYY',
    startDate,
    id,
    showMonthAndYearPicker = true,
    presentation: presentationFromProps,
    ...otherProps
  }: DateRangeFieldProps) => {
    const { log } = useContext(ErrorHandlingContext);
    const { translate } = useContext(LocalizationContext);

    const [hasInputFocus, setHasInputFocus] = useState(false);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [maxLengthInvalidInput, setMaxLengthInvalidInput] = useState(false);
    const [invalidInput, setInvalidInput] = useState(false);
    const [valueOnFocus, setValueOnFocus] = useState('');
    const [tempDate, setTempDate] = useState<DateRangeFieldProps['value']>(undefined);
    const [isValidSelection, setIsValidSelection] = useState(false);

    const togglePickerButtonRef = useRef<HTMLDivElement | null>(null);
    const clickTrackerRef = useRef<HTMLDivElement | null>(null);
    const inputContainerRef = useRef<HTMLInputElement | null>(null);

    const today = getToday();

    const isPointerAndLargeDevice = useMediaQuery('isPointerAndLargeDevice');
    const isTouchDevice = useMediaQuery('isTouchDevice');

    const presentation = useMemo(
      () => presentationFromProps || (isTouchDevice ? 'modal' : 'dropdown'),
      [isTouchDevice, presentationFromProps],
    );
    const numberOfMonths = isPointerAndLargeDevice ? 2 : 1;

    const { value, setValue } = useDateRangeFieldState(_value, defaultValue);
    const hasInputValue = Boolean(value?.from || value?.to || defaultValue);

    const [lastConfirmedValue, setLastConfirmedValue] = useState(value);

    const onBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
      const { value } = event.target;
      const { from, to } = parseMaskedDateRangeToIsoDateRange(value, singleDateMask);
      const dateIsMask = value.toUpperCase() === dateRangeMask.toUpperCase();

      setInvalidInput(false);
      setMaxLengthInvalidInput(false);
      setHasInputFocus(false);

      if (from > to) {
        const dateRangeIso = {
          from: to,
          to: from,
        };
        onValueChange?.(dateRangeIso);
      }

      if (value === valueOnFocus || (dateIsMask && !valueOnFocus)) {
        return;
      }
      onValueChangeFinished?.();
    };

    const dateRangeMask = getDateRangeMask(format);
    const singleDateMask = getDateMask(format);

    const togglePicker = useCallback(() => {
      if (!isPickerOpen) {
        setIsValidSelection(false);
        setTempDate(undefined);
      }
      setIsPickerOpen(!isPickerOpen);
    }, [isPickerOpen]);

    const closePickerOnClickOutside = useCallback(
      (event: globalThis.MouseEvent) => {
        if (
          isPickerOpen &&
          !togglePickerButtonRef.current?.contains(event.target as Node) &&
          !inputContainerRef.current?.contains(event.target as Node) &&
          !clickTrackerRef.current?.contains(event.target as Node)
        ) {
          setIsPickerOpen(false);
          setHasInputFocus(false);
        }
      },
      [isPickerOpen],
    );

    const isValidDate = (date: Date): boolean => {
      return date instanceof Date && !Number.isNaN(date.getTime());
    };

    const cursorPositionBeforeInputRef = useRef<number | null>(null);
    const onInputCapture = (event: ChangeEvent<HTMLInputElement>) => {
      cursorPositionBeforeInputRef.current = event.target.selectionStart;
    };

    const currentInputValueRef = useRef(dateRangeMask.toUpperCase());
    const previousInputValueRef = useRef('');
    const onInput = (event: ChangeEvent<HTMLInputElement>) => {
      const isPrefilledValue = !containsMaskCharacters(event.target.value) && previousInputValueRef.current === '';
      previousInputValueRef.current = isPrefilledValue ? event.target.value : currentInputValueRef.current;
      currentInputValueRef.current = event.target.value;
      const hasTypedAValidKey = currentInputValueRef.current !== previousInputValueRef.current;

      if (hasTypedAValidKey) {
        setInvalidInput(false);
        setMaxLengthInvalidInput(false);

        return;
      }

      const currentCursorPosition = event.target.selectionStart;
      const cursorDidntMove = cursorPositionBeforeInputRef.current! > currentCursorPosition!;
      const endOfMaskReached = currentCursorPosition === dateRangeMask.length;

      setInvalidInput(cursorDidntMove && !endOfMaskReached);
      setMaxLengthInvalidInput(cursorDidntMove && endOfMaskReached);
    };

    const valueRangeValidation = useMemo(() => {
      let minValueOrUndefined = minValue;
      let maxValueOrUndefined = maxValue;
      if (minValue && typeof minValue === 'string' && !isValidDate(parseIsoDate(minValue))) {
        log({
          type: 'warning',
          code: WARNING_CODES.INVALID_DATE,
          message: 'The minValue you specified is invalid.',
        });
        minValueOrUndefined = undefined;
      }

      if (maxValue && typeof maxValue === 'string' && !isValidDate(parseIsoDate(maxValue))) {
        log({
          type: 'warning',
          code: WARNING_CODES.INVALID_DATE,
          message: 'The maxValue you specified is invalid.',
        });
        maxValueOrUndefined = undefined;
      }

      return {
        minValue:
          typeof minValueOrUndefined === 'string'
            ? parseIsoDate(minValueOrUndefined)
            : subYears(today, minValueOrUndefined ?? 100),
        maxValue:
          typeof maxValueOrUndefined === 'string'
            ? parseIsoDate(maxValueOrUndefined)
            : addYears(today, maxValueOrUndefined ?? 100),
      };
    }, [log, maxValue, minValue, today]);

    const isValueAfterMaxDate = useMemo(() => {
      if (!maxValue) return false;

      return Boolean(value && isAfterDate(parseIsoDate(value.to), valueRangeValidation.maxValue));
    }, [value, maxValue, valueRangeValidation.maxValue]);

    const isValueBeforeMinDate = useMemo(() => {
      if (!minValue) return false;

      return Boolean(value && isBeforeDate(parseIsoDate(value.from), valueRangeValidation.minValue));
    }, [value, minValue, valueRangeValidation.minValue]);

    const validations = useMemo((): Validation[] => {
      return [
        {
          text: translate('date-range-field-invalid-from-and-to-date'),
          focused: true,
          hasError: () =>
            value?.from && value?.to
              ? !containsMaskCharacters(value.from) &&
                !containsMaskCharacters(value.to) &&
                !isValidDate(parseIsoDate(value.from)) &&
                !isValidDate(parseIsoDate(value.to))
              : false,
        },
        {
          text: translate('date-range-field-invalid-from-date'),
          focused: true,
          hasError: () =>
            value?.from ? !containsMaskCharacters(value.from) && !isValidDate(parseIsoDate(value.from)) : false,
        },
        {
          text: translate('date-range-field-invalid-to-date'),
          focused: true,
          hasError: () =>
            value?.to ? !containsMaskCharacters(value.to) && !isValidDate(parseIsoDate(value.to)) : false,
        },
        {
          text: translate('date-range-field-incomplete-date-range'),
          hasError: () =>
            value?.from || value?.to ? containsMaskCharacters(value.from) || containsMaskCharacters(value.to) : false,
        },
        {
          text: replacePlaceholder(translate('date-range-field-before-min-date-1'), {
            '%1%': formatDateToString(valueRangeValidation.minValue, getDateMask(format)),
          }),
          focused: true,
          hasError: () => isValueBeforeMinDate,
        },
        {
          text: replacePlaceholder(translate('date-range-field-after-max-date-1'), {
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
      value,
      valueRangeValidation.maxValue,
      valueRangeValidation.minValue,
    ]);

    const floatingValidations = useMemo((): FloatingValidation[] => {
      return [
        {
          // 'Only numbers and date separators are allowed'
          text: translate('date-field-invalid-symbol'),
          hasError: () => invalidInput,
        },
        {
          text: translate('date-field-max-length'),
          hasError: () => maxLengthInvalidInput,
        },
      ];
    }, [invalidInput, maxLengthInvalidInput, translate]);

    const valueRangePicker = useMemo(() => {
      const minimalDate = new Date('0001-01-01');
      const checkForMinimalDate = (date: Date): Date => {
        if (date > minimalDate) {
          return date;
        }

        return minimalDate;
      };

      if (maxValue && minValue) {
        const parsedMaxValue = typeof maxValue === 'string' ? parseIsoDate(maxValue) : addYears(today, maxValue);
        const parsedMinValue = typeof minValue === 'string' ? parseIsoDate(minValue) : subYears(today, minValue);
        if (parsedMaxValue < parsedMinValue) {
          return {
            minValue: subYears(value ? parseIsoDate(value.from) : today, 100),
            maxValue: addYears(value ? parseIsoDate(value.to) : today, 100),
          };
        }
      }

      if (value && !Number.isNaN(parseIsoDate(value.from).getTime()) && (!minValue || !maxValue)) {
        if (!minValue && !maxValue) {
          return {
            minValue: checkForMinimalDate(subYears(parseIsoDate(value.from), 100)),
            maxValue: addYears(parseIsoDate(value.to), 100),
          };
        }

        if (maxValue && !minValue) {
          return {
            maxValue: typeof maxValue === 'string' ? parseIsoDate(maxValue) : addYears(today, maxValue),
            minValue: checkForMinimalDate(subYears(parseIsoDate(value.from), 100)),
          };
        }

        if (minValue && !maxValue) {
          return {
            maxValue: addYears(parseIsoDate(value.to), 100),
            minValue: typeof minValue === 'string' ? parseIsoDate(minValue) : subYears(today, minValue),
          };
        }
      }

      return {
        minValue: typeof minValue === 'string' ? parseIsoDate(minValue) : subYears(today, minValue ?? 100),
        maxValue: typeof maxValue === 'string' ? parseIsoDate(maxValue) : addYears(today, maxValue ?? 100),
      };
    }, [maxValue, minValue, today, value]);

    const closePickerOnEscapePress = useCallback(
      (event: KeyboardEvent) => {
        if (isPickerOpen && event.key === 'Escape') {
          event.stopPropagation();
          togglePicker();
        }
      },
      [isPickerOpen, togglePicker],
    );

    const mask = dateRangeMask.replaceAll(/\W/g, '$&`');

    const maskedDateRange = value == null ? '' : parseIsoDateRangeToMaskedDate(value, singleDateMask);

    const maskedDefaultValue = defaultValue && parseIsoDateRangeToMaskedDate(defaultValue, singleDateMask);

    useEffect(() => {
      document.addEventListener('click', closePickerOnClickOutside, { capture: true });
      document.addEventListener('keydown', closePickerOnEscapePress, { capture: true });

      return () => {
        document.removeEventListener('click', closePickerOnClickOutside, { capture: true });
        document.removeEventListener('keydown', closePickerOnEscapePress, { capture: true });
      };
    }, [closePickerOnClickOutside, togglePicker, closePickerOnEscapePress]);

    const onAccept = (inputFieldValue: string) => {
      const valueOrEmtpyString =
        inputFieldValue.toLocaleLowerCase() === dateRangeMask.toLocaleLowerCase() ? '' : inputFieldValue;

      const valueAsIsoDateRange = parseMaskedDateRangeToIsoDateRange(valueOrEmtpyString, singleDateMask);
      setValue(valueAsIsoDateRange);
      onValueChange?.(valueAsIsoDateRange);
      setLastConfirmedValue(valueAsIsoDateRange);
    };

    const onFocus = (event: FocusEvent<HTMLInputElement, Element>) => {
      setHasInputFocus(true);
      setValueOnFocus(event.target.value);
    };

    const onDoubleClick = (event: React.MouseEvent<HTMLInputElement>) => {
      (event.target as HTMLInputElement).select();
    };

    const onPickerChange = useCallback(
      (dateRange?: DateRange, closePicker?: boolean) => {
        if (!dateRange || !dateRange.from || !dateRange.to) {
          setIsValidSelection(false);

          return;
        }

        const dateRangeIso: DateRangeFieldProps['value'] = {
          from: formatDateToDateIso(dateRange.from),
          to: formatDateToDateIso(dateRange.to),
        };

        if (value && isEqual(dateRangeIso, value)) {
          setIsValidSelection(false);

          return;
        }

        setIsValidSelection(true);

        if (presentation === 'modal') {
          setTempDate(dateRangeIso);

          return;
        }

        if (closePicker) {
          setIsPickerOpen(false);
        }

        setValue(dateRangeIso);
        onValueChange?.(dateRangeIso);
        setLastConfirmedValue(dateRangeIso);
        queueMicrotask(() => onValueChangeFinished?.());
      },
      [onValueChange, onValueChangeFinished, presentation, setValue, value],
    );

    const onConfirm = useCallback(() => {
      if (tempDate && isValidSelection) {
        setValue(tempDate);
        onValueChange?.(tempDate);
        setLastConfirmedValue(tempDate);

        queueMicrotask(() => onValueChangeFinished?.());
      }
      setIsPickerOpen(false);
      setTempDate(undefined);
    }, [tempDate, isValidSelection, setValue, onValueChange, onValueChangeFinished]);

    const onCancel = () => {
      setIsPickerOpen(false);
      setTempDate(undefined);
      setIsValidSelection(false);
    };

    const calendar = useMemo(() => {
      const datePickerValue =
        tempDate && isValidSelection
          ? { from: parseIsoDate(tempDate.from), to: parseIsoDate(tempDate.to) }
          : lastConfirmedValue
            ? { from: parseIsoDate(lastConfirmedValue.from), to: parseIsoDate(lastConfirmedValue.to) }
            : undefined;

      return (
        <DatePicker
          maxValue={valueRangePicker.maxValue}
          minValue={valueRangePicker.minValue}
          numberOfMonths={numberOfMonths}
          value={datePickerValue}
          mode="range"
          size={size}
          startDate={startDate && isValidDate(parseIsoDate(startDate)) ? parseIsoDate(startDate) : undefined}
          onDateRangeChange={(dateRange, close = true) => onPickerChange(dateRange, close)}
          showMonthAndYearPicker={showMonthAndYearPicker}
        />
      );
    }, [
      tempDate,
      isValidSelection,
      lastConfirmedValue,
      valueRangePicker.maxValue,
      valueRangePicker.minValue,
      numberOfMonths,
      size,
      startDate,
      showMonthAndYearPicker,
      onPickerChange,
    ]);

    return (
      <InputField
        label={label}
        hasInputFocus={hasInputFocus}
        hasInputValue={hasInputValue}
        helpText={helpText}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
        value={maskedDateRange}
        mandatory={mandatory}
        validationMessage={validationMessage}
        validationState={validationState}
        hasButton
        validations={validations}
        floatingValidations={floatingValidations}
        input={({ id, inputStyles, buttonStyles }) => (
          <S.InputContainer ref={inputContainerRef}>
            <IMaskInput
              inputRef={ref}
              data-get-form-data-parsed
              data-get-form-data-unmasked={
                !isValueBeforeMinDate &&
                !isValueAfterMaxDate &&
                value &&
                isValidDate(parseIsoDate(value.from)) &&
                isValidDate(parseIsoDate(value.to))
                  ? JSON.stringify({ from: value.from, to: value.to })
                  : ''
              }
              data-get-form-data-mask={mask}
              id={id}
              css={inputStyles}
              disabled={disabled}
              readOnly={readOnly}
              mask={mask}
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
              value={maskedDateRange}
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
              togglePickerButtonRef={togglePickerButtonRef}
              clickTrackerRef={clickTrackerRef}
              label={label}
              buttonStyles={buttonStyles}
              size={size}
              calendar={calendar}
              presentation={presentation}
              numberOfMonths={numberOfMonths}
              onConfirm={onConfirm}
              onCancel={onCancel}
              isValidSelection={isValidSelection}
            />
          </S.InputContainer>
        )}
      />
    );
  },
);
