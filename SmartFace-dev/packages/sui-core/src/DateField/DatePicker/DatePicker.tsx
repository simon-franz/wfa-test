import { useMediaQuery } from '@hrworks/design-system';
import { LocalizationContext } from '@hrworks/localization';
import { getToday, isValidDate } from '@hrworks/sui-shared/functions/dateFunctions';
import type { Size } from '@hrworks/types/shared/UiTypes';
import { addMonths, getMonth, getYear, isSameYear, setMonth, setYear, subMonths } from 'date-fns';
import { de } from 'date-fns/locale';
import { observer } from 'mobx-react';
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { type ClassNames, type DateRange, isDateRange } from 'react-day-picker';
import type { SwipeEventData } from 'react-swipeable';

import { MonthPicker } from '../MonthPicker';
import { YearPicker } from '../YearPicker';
import { S } from './DatePicker.styles';
import { DatePickerCaption } from './DatePickerCaption';
import { DatePickerContext } from './DatePickerContext';

type DatePickerBaseType = {
  minValue?: Date;
  maxValue?: Date;
  numberOfMonths?: number;
  visibleMonth?: Date;
  size?: Size;
  picker?: Array<PickerType>;
  startDate?: Date;
  onDateChange?: (date: Date | undefined, close?: boolean) => void;
  onDateRangeChange?: (dateRange: DateRange | undefined) => void;
  showMonthAndYearPicker: boolean;
};

export type PickerType = 'day' | 'month' | 'year';

type SingleDatePickerProps = {
  mode: 'single';
  value?: Date;
} & DatePickerBaseType;

type RangeDatePickerProps = {
  mode: 'range';
  value?: DateRange;
} & DatePickerBaseType;

type DatePickerProps = SingleDatePickerProps | RangeDatePickerProps;

export const DatePicker = observer(
  ({
    minValue,
    maxValue,
    mode = 'single',
    numberOfMonths = 1,
    startDate,
    size = 'medium',
    onDateChange,
    onDateRangeChange,
    value,
    picker = ['day', 'month', 'year'],
    showMonthAndYearPicker,
  }: DatePickerProps) => {
    const { shortMonthNames } = useContext(LocalizationContext);
    const isPointerDevice = useMediaQuery('isPointerDevice');
    const today = getToday();
    const [selectModeIndex, setSelectModeIndex] = useState(0);
    const [from, setFrom] = useState<Date | undefined>(isDateRange(value) ? value?.from : undefined);
    const [to, setTo] = useState<Date | undefined>(isDateRange(value) ? value?.to : undefined);
    const [tempTo, setTempTo] = useState<Date | null>();
    const [ongoingSelection, setOngoingSelection] = useState(false);

    const visibleMonthValue = useMemo((): Date => {
      if (startDate) {
        return startDate;
      }
      if (mode === 'single' && value && !isDateRange(value) && isValidDate(value)) {
        return value;
      }
      if (mode === 'range' && isDateRange(value) && value?.from && isValidDate(value.from)) {
        return isValidDate(value.from) ? value.from : today;
      }

      return getToday();
    }, [mode, startDate, today, value]);

    const [visibleMonth, setVisibleMonth] = useState(visibleMonthValue);
    const pickerRef = useRef<HTMLDivElement | null>(null);

    const parsedValue = useMemo(() => {
      if (isDateRange(value)) {
        return value.from;
      } else if (mode === 'single') {
        return value;
      }

      return;
    }, [mode, value]);

    const classNames: ClassNames = {
      day: 'sf-day',
      months: 'sf-months',
      table: 'sf-table',
      cell: 'sf-cell',
      weeknumber: 'sf-weeknumber',
      vhidden: 'sf-vhidden',
      button: 'sf-button',
      head_cell: 'sf-head-cell',
      day_today: 'sf-day-today',
      day_selected: 'sf-day-selected',
      day_outside: 'sf-day-outside',
      day_disabled: 'sf-day-disabled',
      day_range_middle: 'sf-day-range-middle',
      day_range_start: 'sf-day-range-start',
      day_range_end: 'sf-day-range-end',
    };

    const onDayClickRange = useCallback(
      (date: Date) => {
        const valueFromInputField = isDateRange(value) ? value : undefined;
        if (!onDateRangeChange) {
          return null;
        }

        if (!from && mode === 'range') {
          setOngoingSelection(true);
          setFrom(date);
          onDateRangeChange({
            from: date,
            to: isValidDate(valueFromInputField?.to) ? valueFromInputField?.to : undefined,
          });

          return;
        }

        if (from && to) {
          setOngoingSelection(true);
          setFrom(date);
          setTo(undefined);
          onDateRangeChange({ from: from, to: undefined });

          return;
        }

        if (from) {
          if (from > date) {
            const copyFrom = from;
            onDateRangeChange({ from: date, to: copyFrom });
            setFrom(date);
            setTo(copyFrom);
            setTempTo(null);

            return;
          }

          setOngoingSelection(false);
          from && onDateRangeChange({ from, to: date });
          setTo(date);
          setTempTo(null);
        }
      },
      [value, from, mode, to, onDateRangeChange],
    );

    const onDayMouseEnter = useCallback(
      (date: Date) => {
        from && !to && setTempTo(date);
      },
      [from, to],
    );

    const onDayClick = useCallback(
      (date: Date) => {
        if (mode === 'single') {
          (onDateChange as (date: Date) => void)?.(date);
        }

        if (mode === 'range') {
          onDayClickRange(date);
        }
      },
      [mode, onDateChange, onDayClickRange],
    );

    let formattedValue: Date | DateRange | undefined = value;
    formattedValue = mode === 'single' && value instanceof Date ? value : undefined;

    const selectMode = useMemo(() => picker?.at(selectModeIndex) || 'day', [picker, selectModeIndex]) as PickerType;

    const cycleSelectMode = useCallback(
      (backwards: boolean = false) => {
        const match = picker!.indexOf(selectMode);
        if (match < 0) {
          return;
        }

        if (backwards) {
          setSelectModeIndex(match === 0 ? picker!.length - 1 : match - 1);
        } else {
          setSelectModeIndex(match === picker!.length - 1 ? 0 : match + 1);
        }
      },
      [picker, selectMode],
    );

    const onMonthChange = useCallback(
      (month: number) => {
        const newDate = setMonth(visibleMonth, month);
        onDateChange?.(newDate, false);
        setVisibleMonth(newDate);
        cycleSelectMode(true);
      },
      [cycleSelectMode, onDateChange, visibleMonth],
    );

    const onYearChange = useCallback(
      (year: number) => {
        const newDate = setYear(visibleMonth, year);
        onDateChange?.(newDate, false);
        setVisibleMonth(newDate);
        cycleSelectMode(true);
      },
      [cycleSelectMode, onDateChange, visibleMonth],
    );

    const selectedRange = useMemo((): DateRange => {
      if (!to) {
        return from && tempTo && from > tempTo
          ? { from: tempTo, to: from }
          : { from, to: tempTo == null ? undefined : tempTo };
      }
      if (from && from > to) {
        return { from: to, to: from };
      }

      return { from, to };
    }, [from, tempTo, to]);

    const renderPicker = useMemo(() => {
      switch (selectMode) {
        case 'month':
          const valueOrToday = parsedValue || today;

          return (
            <MonthPicker
              pickerRef={pickerRef.current}
              minValue={minValue && valueOrToday && isSameYear(minValue, valueOrToday) ? getMonth(minValue) : undefined}
              maxValue={maxValue && valueOrToday && isSameYear(maxValue, valueOrToday) ? getMonth(maxValue) : undefined}
              monthNames={shortMonthNames}
              onChange={onMonthChange}
              selectedMonth={parsedValue && getMonth(parsedValue)}
            />
          );
        case 'year':
          return (
            <YearPicker
              minYear={minValue && getYear(minValue)}
              maxYear={maxValue && getYear(maxValue)}
              onChange={onYearChange}
              selectedYear={parsedValue && getYear(parsedValue)}
            />
          );
      }

      return null;
    }, [maxValue, minValue, onMonthChange, onYearChange, parsedValue, selectMode, shortMonthNames, today]);

    const handleSwipe = useCallback(
      (eventData: SwipeEventData) => {
        if (isPointerDevice || selectMode !== 'day') return;
        const updateMonth = (monthAdjuster: (date: Date, amount: number) => Date) => {
          setVisibleMonth((prevMonth) => monthAdjuster(prevMonth, 1));
        };
        switch (eventData.dir) {
          case 'Left':
            updateMonth(addMonths);
            break;
          case 'Right':
            updateMonth(subMonths);
            break;
        }
      },
      [isPointerDevice, selectMode],
    );

    return (
      <DatePickerContext.Provider value={{ today, cycleSelectMode, selectMode, size }}>
        <S.DatePickerContainer size={size} onSwiped={handleSwipe} delta={20}>
          <S.DayPicker
            selected={mode === 'single' ? formattedValue : ongoingSelection ? selectedRange : { to, from }}
            classNames={classNames}
            fromDate={minValue}
            onDayMouseEnter={isPointerDevice && mode === 'range' ? onDayMouseEnter : undefined}
            toDate={maxValue}
            initialFocus
            month={visibleMonth}
            fixedWeeks={true}
            weekStartsOn={1}
            $hidden={selectMode !== 'day'}
            numberOfMonths={numberOfMonths}
            locale={de}
            mode={mode as any} // TODO: Nedir take a look cause I didn't
            defaultMonth={startDate}
            components={{
              Caption: (props) => (
                <DatePickerCaption
                  setVisibleMonth={setVisibleMonth}
                  numberOfMonths={numberOfMonths}
                  showMonthAndYearPicker={showMonthAndYearPicker}
                  size={size}
                  hideArrows={selectMode !== 'day'}
                  {...props}
                />
              ),
            }}
            onDayClick={onDayClick}
            showOutsideDays={mode === 'single' ? true : numberOfMonths === 1 ? true : false}
          />
          {renderPicker}
        </S.DatePickerContainer>
      </DatePickerContext.Provider>
    );
  },
);
