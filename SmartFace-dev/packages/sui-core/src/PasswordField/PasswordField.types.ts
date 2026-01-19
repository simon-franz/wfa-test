import type { InputProps } from '@hrworks/types/shared/UiTypes';
import type { InputHTMLAttributes, RefObject } from 'react';

export type PasswordFieldProps = InputProps & {
  ref?: RefObject<HTMLInputElement | null>;
  allowShowPassword?: boolean;
  onValueChange?: (value: string) => void;
  onValueChangeFinished?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
