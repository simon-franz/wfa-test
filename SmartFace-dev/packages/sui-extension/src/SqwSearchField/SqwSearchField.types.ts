import type { InputProps } from '@hrworks/types/shared/UiTypes';
import type { InputHTMLAttributes } from 'react';

export type SqwSearchFieldProps = InputProps & {
  onSearchClick?: () => void;
  onValueChangeFinished?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
