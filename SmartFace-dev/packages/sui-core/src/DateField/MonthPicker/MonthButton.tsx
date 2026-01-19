import { type HTMLAttributes, type MouseEvent, useCallback, useContext } from 'react';

import { DatePickerContext } from '../DatePicker/DatePickerContext';
import { S } from './MonthButton.styles';

type MonthButtonPropsType = {
  value: number;
  displayValue: string;
  onClick: (value: number) => void;
  selected?: boolean;
  disabled?: boolean;
} & Omit<HTMLAttributes<HTMLButtonElement>, 'onClick' | 'color'>;

export const MonthButton = ({
  value,
  onClick,
  displayValue,
  disabled,
  tabIndex,
  selected,
  ...otherProps
}: MonthButtonPropsType) => {
  const { size } = useContext(DatePickerContext);

  const onClickButton = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onClick(value);
    },
    [onClick, value],
  );

  return (
    <S.Button
      tabIndex={tabIndex ?? -1}
      onClick={onClickButton}
      variant={selected ? 'ghost' : 'subtle'}
      size={size}
      disabled={disabled}
      {...otherProps}
    >
      {displayValue}
    </S.Button>
  );
};
