import type { InputProps, Presentation } from '@hrworks/types/shared/UiTypes';
import type { InputHTMLAttributes, ReactNode, RefObject } from 'react';

export type TimeFieldProps = InputProps & {
  ref?: RefObject<HTMLInputElement | null>;
  defaultValue?: string;
  value?: string;
  timePickerMinutesStepSize?: number;
  presentation?: Presentation;
  showSeconds?: boolean;
  timePickerToggleIcon?: ReactNode;
  onValueChange?: (value: string) => void;
  onValueChangeFinished?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
