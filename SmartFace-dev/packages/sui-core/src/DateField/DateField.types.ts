import type { DateFormat, InputProps, Presentation } from '@hrworks/types/shared/UiTypes';
import type { InputHTMLAttributes } from 'react';

export type DateFieldProps = InputProps & {
  format?: DateFormat;
  minValue?: string | number;
  maxValue?: string | number;
  showMonthAndYearPicker?: boolean;
  presentation?: Presentation;
  onValueChangeFinished?: () => void;
  onValueChange?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value'>;
