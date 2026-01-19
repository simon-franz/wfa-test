import type { FormComponentProps } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type CheckboxGroupOption = {
  id: string;
  label: string;
};

export type CheckboxGroupProps = FormComponentProps & {
  options: CheckboxGroupOption[];
  value?: CheckboxGroupOption['id'][];
  optionsDirection?: 'column' | 'row';
  noOptionsAvailableText?: string;
  onValueChange?: (value: CheckboxGroupProps['value']) => void;
} & HTMLAttributes<HTMLDivElement>;
