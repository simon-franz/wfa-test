import type { FormComponentProps } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type RadioGroupProps = FormComponentProps & {
  value?: string;
  optionsDirection?: 'column' | 'row';
  noOptionsAvailableText?: string;
  onValueChange?: (value: string) => void;
} & HTMLAttributes<HTMLDivElement>;
