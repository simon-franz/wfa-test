import type { ButtonProps } from '../../Button/Button.types';

export type TimePickerButtonProps = {
  direction: 'up' | 'down';
  mobile?: boolean;
} & ButtonProps;
