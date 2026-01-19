import type { FormComponentProps, JustifyContent } from '@hrworks/types/shared/UiTypes';
import type { InputHTMLAttributes } from 'react';

export type RadioProps = {
  value: string;
  justifyContent?: Exclude<JustifyContent, 'space-around' | 'space-evenly'>;
} & Omit<FormComponentProps, 'name' | 'size'> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value'>;
