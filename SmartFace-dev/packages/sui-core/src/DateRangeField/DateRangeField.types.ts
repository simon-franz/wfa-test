import type { DateFormat, InputProps, IsoDateRange, Presentation } from '@hrworks/types/shared/UiTypes';
import type { InputHTMLAttributes, RefObject } from 'react';

export type DateRangeFieldProps = InputProps<IsoDateRange> & {
  ref?: RefObject<HTMLInputElement | null>;
  startDate?: string;
  format?: DateFormat;
  minValue?: string | number;
  maxValue?: string | number;
  showMonthAndYearPicker?: boolean;
  presentation?: Presentation;
  onValueChangeFinished?: () => void;
  onValueChange?: (value: IsoDateRange | undefined) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue'>;
