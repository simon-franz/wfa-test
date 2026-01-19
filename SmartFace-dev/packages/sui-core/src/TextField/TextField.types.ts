import type { SerializedStyles } from '@emotion/react';
import type { FloatingValidation, InputProps, Validation } from '@hrworks/types/shared/UiTypes';
import type { InputHTMLAttributes, ReactNode } from 'react';

export type TextFieldProps = InputProps & {
  type?: string;
  validations?: Validation[];
  floatingValidations?: FloatingValidation[];
  onValueChange?: (value: string) => void;
  onValueChangeFinished?: (value: string) => void;
  renderButton?: (buttonStyles: SerializedStyles) => ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
