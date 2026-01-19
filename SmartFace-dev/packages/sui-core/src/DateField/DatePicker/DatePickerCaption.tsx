import { LocalizationContext } from '@hrworks/localization';
import type { Size } from '@hrworks/types/shared/UiTypes';
import { format, isSameMonth } from 'date-fns';
import { observer } from 'mobx-react';
import { type Dispatch, type SetStateAction, useCallback, useContext, useMemo } from 'react';
import { type CaptionProps, useNavigation } from 'react-day-picker';

import Icon from '../../Icon';
import { S } from './DatePickerCaption.styles';
import { DatePickerContext } from './DatePickerContext';

type CalendarCaptionPropsType = {
  numberOfMonths?: number;
  size?: Size;
  hideArrows?: boolean;
  setVisibleMonth: Dispatch<SetStateAction<Date>>;
  showMonthAndYearPicker: boolean;
} & CaptionProps;

export const DatePickerCaption = observer(
  ({
    displayMonth,
    size = 'medium',
    numberOfMonths,
    setVisibleMonth,
    showMonthAndYearPicker,
    hideArrows,
    ...otherProps
  }: CalendarCaptionPropsType) => {
    const { cycleSelectMode } = useContext(DatePickerContext);
    const { monthNames } = useContext(LocalizationContext);

    const { nextMonth, previousMonth, currentMonth, displayMonths } = useNavigation();

    const isFirstMonth = useMemo(
      () => currentMonth.getMonth() === displayMonth.getMonth(),
      [currentMonth, displayMonth],
    );

    const isLastMonth =
      displayMonths.findIndex((month) => isSameMonth(displayMonth, month)) === displayMonths.length - 1;

    const onPreviousButtonClick = useCallback(() => {
      previousMonth && setVisibleMonth(previousMonth);
    }, [previousMonth, setVisibleMonth]);

    const onNextButtonClick = useCallback(() => {
      nextMonth && setVisibleMonth(nextMonth);
    }, [nextMonth, setVisibleMonth]);

    const onLabelClick = useCallback(() => {
      cycleSelectMode();
    }, [cycleSelectMode]);
    const isSingleMonth = numberOfMonths === 1;

    return (
      <S.Container isSingleMonth={isSingleMonth} isFirstMonth={isFirstMonth} {...otherProps}>
        {isSingleMonth ? (
          <>
            <S.CaptionContainer size={size} isSingleMonth={isSingleMonth}>
              <S.Caption
                variant="subtle"
                size={size}
                $notClickable={!showMonthAndYearPicker}
                onClick={showMonthAndYearPicker ? onLabelClick : undefined}
                tabIndex={showMonthAndYearPicker ? 0 : -1}
              >
                {monthNames[displayMonth.getMonth()]} {format(displayMonth, ' yyyy')}
              </S.Caption>
            </S.CaptionContainer>
            <S.ArrowContainer>
              <S.Arrow
                $hidden={hideArrows}
                variant="subtle"
                size={size}
                onClick={onPreviousButtonClick}
                disabled={!previousMonth}
              >
                <Icon name="calendar-angle-left" />
              </S.Arrow>
              <S.Arrow
                $hidden={hideArrows}
                variant="subtle"
                size={size}
                onClick={onNextButtonClick}
                disabled={!nextMonth}
              >
                <Icon name="calendar-angle-right" />
              </S.Arrow>
            </S.ArrowContainer>
          </>
        ) : (
          <>
            {(isFirstMonth || isLastMonth) && (
              <S.Arrow
                $rotate={!isFirstMonth}
                $hidden={hideArrows}
                variant="subtle"
                size={size}
                onClick={isFirstMonth ? onPreviousButtonClick : onNextButtonClick}
                disabled={isFirstMonth ? !previousMonth : !nextMonth}
              >
                <Icon name="calendar-angle-left" />
              </S.Arrow>
            )}
            <S.CaptionContainer size={size} isSingleMonth={isSingleMonth}>
              <S.Caption
                variant="subtle"
                size={size}
                $notClickable={!showMonthAndYearPicker}
                onClick={showMonthAndYearPicker ? onLabelClick : undefined}
                tabIndex={showMonthAndYearPicker ? 0 : -1}
              >
                {monthNames[displayMonth.getMonth()]} {format(displayMonth, ' yyyy')}
              </S.Caption>
            </S.CaptionContainer>
            {numberOfMonths === 1 && (
              <S.Arrow
                $hidden={hideArrows}
                variant="subtle"
                size={size}
                onClick={onNextButtonClick}
                disabled={!nextMonth}
              >
                <Icon name="calendar-angle-right" />
              </S.Arrow>
            )}
          </>
        )}
      </S.Container>
    );
  },
);
