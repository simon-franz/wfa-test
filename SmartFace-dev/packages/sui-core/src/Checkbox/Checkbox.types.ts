import type { FormComponentProps, JustifyContent, Size } from '@hrworks/types/shared/UiTypes';
import type { InputHTMLAttributes, ReactNode } from 'react';

export type CheckboxProps = FormComponentProps & {
  size?: Size;
  labelChildren?: ReactNode;
  justifyContent?: Exclude<JustifyContent, 'space-around' | 'space-evenly'>;
  onValueChange?: (checked: boolean) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
