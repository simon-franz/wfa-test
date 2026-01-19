import type { NumberInputProps } from '@hrworks/types/shared/UiTypes';
import type { InputHTMLAttributes, RefObject } from 'react';

export type DecimalFieldProps = NumberInputProps & {
  ref?: RefObject<HTMLInputElement | null>;
  padFractionalZeros?: boolean;
  normalizeZeros?: boolean;
  mapToRadix?: string[];
  radix?: string;
  scale?: number;
  onValueChange?: (value: string) => void;
  onValueChangeFinished?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
