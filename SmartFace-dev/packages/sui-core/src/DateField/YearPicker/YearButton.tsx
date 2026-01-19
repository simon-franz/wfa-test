import { forwardRef, type HTMLAttributes, type MouseEvent, useContext } from 'react';

import { DatePickerContext } from '../DatePicker/DatePickerContext';
import { S } from './YearButton.styles';

type YearButtonPropsType = {
  selected?: boolean;
  value: number;
  onClick: (event: MouseEvent<HTMLButtonElement>, value: number) => void;
} & Omit<HTMLAttributes<HTMLButtonElement>, 'onClick' | 'color'>;

export const YearButton = forwardRef<HTMLButtonElement | null, YearButtonPropsType>(
  ({ selected, value, onClick, tabIndex, ...otherProps }, ref) => {
    const onClickButton = (event: MouseEvent<HTMLButtonElement>) => {
      onClick(event, value);
    };

    const { size } = useContext(DatePickerContext);

    return (
      <S.Button
        size={size}
        ref={ref}
        variant={selected ? 'ghost' : 'subtle'}
        tabIndex={tabIndex ?? -1}
        onClick={onClickButton}
        {...otherProps}
      >
        {value}
      </S.Button>
    );
  },
);
