import type { NumberInputProps } from '@hrworks/types/shared/UiTypes';
import type { InputHTMLAttributes, RefObject } from 'react';

export type IntegerFieldProps = NumberInputProps & {
  ref?: RefObject<HTMLInputElement | null>;
  onValueChange?: (value: string) => void;
  onValueChangeFinished?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
