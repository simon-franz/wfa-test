import { getToday, getYear } from '@hrworks/sui-shared/functions/dateFunctions';
import { addYears } from 'date-fns/addYears';
import { subYears } from 'date-fns/subYears';
import range from 'lodash/range';
import { type HTMLAttributes, type MouseEvent, useCallback, useContext, useEffect, useRef } from 'react';

import { Scroller } from '../../Scroller';
import { DatePickerContext } from '../DatePicker/DatePickerContext';
import { KeyboardNavigableGridList } from '../KeyboardNavigableGridList';
import { YearButton } from './YearButton';
import { S } from './YearPicker.styles';

export type YearPickerPropsType = {
  selectedYear?: number;
  minYear?: number;
  maxYear?: number;
  onChange: (value: number) => void;
} & Omit<HTMLAttributes<HTMLElement>, 'onChange'>;

const today = getToday();

export const YearPicker = ({
  selectedYear,
  minYear = getYear(subYears(today, 100)),
  maxYear = getYear(addYears(today, 100)),
  onChange,
  ...otherProps
}: YearPickerPropsType) => {
  const context = useContext(DatePickerContext);

  const selectedYearRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    selectedYearRef.current?.scrollIntoView({ block: 'center' });
  }, []);

  const onYearChange = useCallback(
    (event: MouseEvent<HTMLButtonElement>, year: number) => {
      event.preventDefault();
      event.stopPropagation();
      onChange(year);
    },
    [onChange],
  );

  return (
    <KeyboardNavigableGridList columns={4} minIndex={minYear} maxIndex={maxYear}>
      {({ gridRef, onKeyDown }) => (
        <Scroller>
          <S.Picker ref={gridRef} onKeyDown={onKeyDown} {...otherProps}>
            {range(minYear, maxYear + 1).map((year) => (
              <YearButton
                key={year}
                data-grid-list-index={year}
                value={year}
                onClick={onYearChange}
                {...(year === selectedYear || (!selectedYear && year === getYear(context.today))
                  ? { ref: selectedYearRef, tabIndex: 0, selected: true }
                  : {})}
              />
            ))}
          </S.Picker>
        </Scroller>
      )}
    </KeyboardNavigableGridList>
  );
};
