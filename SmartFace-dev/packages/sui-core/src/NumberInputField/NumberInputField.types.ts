import type { NumberInputProps } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, RefObject } from 'react';

export type NumberInputFieldProps = Partial<NumberInputProps> & {
  ref?: RefObject<HTMLInputElement | null>;
  padFractionalZeros?: boolean;
  normalizeZeros?: boolean;
  mapToRadix?: string[];
  radix?: string;
  scale?: number;
  onValueChange?: (value: string) => void;
  onValueChangeFinished?: (value: string) => void;
} & HTMLAttributes<HTMLInputElement>;
