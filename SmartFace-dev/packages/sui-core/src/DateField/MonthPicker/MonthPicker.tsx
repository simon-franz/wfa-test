import { getMonth } from '@hrworks/sui-shared/functions/dateFunctions';
import { type HTMLAttributes, useCallback, useContext, useEffect, useRef } from 'react';

import { DatePickerContext } from '../DatePicker/DatePickerContext';
import { KeyboardNavigableGridList } from '../KeyboardNavigableGridList';
import { MonthButton } from './MonthButton';
import { S } from './MonthPicker.styles';

export type MonthPickerPropsType = {
  minValue?: number;
  maxValue?: number;
  pickerRef?: HTMLDivElement | null;
  monthNames: Array<string>;
  selectedMonth?: number;
  onChange: (value: number) => void;
} & Omit<HTMLAttributes<HTMLElement>, 'onChange'>;

export const MonthPicker = ({
  pickerRef,
  onChange,
  minValue,
  maxValue,
  monthNames,
  selectedMonth,
  ...otherProps
}: MonthPickerPropsType) => {
  const context = useContext(DatePickerContext);

  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (pickerRef && !pickerRef.contains(document.activeElement)) {
      (gridRef.current?.querySelector('[tabindex="0"]') as HTMLElement | null)?.focus();
    }
  }, [pickerRef]);

  const onMonthChange = useCallback(
    (value: number) => {
      onChange(value);
    },
    [onChange],
  );

  return (
    <KeyboardNavigableGridList gridRef={gridRef} columns={3} minIndex={0} maxIndex={11}>
      {({ gridRef, onKeyDown }) => (
        <S.Picker ref={gridRef} onKeyDown={onKeyDown} {...otherProps}>
          {monthNames.map((monthName, index) => (
            <MonthButton
              key={monthName}
              data-grid-list-index={index}
              value={index}
              disabled={(minValue != null && index < minValue) || (maxValue != null && index > maxValue)}
              displayValue={monthName}
              onClick={onMonthChange}
              selected={selectedMonth === index}
              tabIndex={(selectedMonth || getMonth(context.today)) === index ? 0 : -1}
            />
          ))}
        </S.Picker>
      )}
    </KeyboardNavigableGridList>
  );
};
