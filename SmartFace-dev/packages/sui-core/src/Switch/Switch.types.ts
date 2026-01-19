import type { FormComponentProps, JustifyContent, Size } from '@hrworks/types/shared/UiTypes';
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';

export type SwitchProps = {
  checked?: boolean;
  justifyContent?: Exclude<JustifyContent, 'space-around' | 'space-evenly'>;
  size?: Size;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  labelChildren?: ReactNode;
} & FormComponentProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
