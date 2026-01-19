// TODO: find a better solution to get types from field UI components without
// importing any SUI package (except shared)
import type { SerializedStyles } from '@emotion/react';
import type {
  FloatingValidation,
  FormComponentBaseProps,
  InputDescriptionProps,
  InputProps,
  NumberInputProps,
  Validation,
} from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, InputHTMLAttributes, ReactNode, RefObject } from 'react';

// Should be identical to IntegerField.types
export type IntegerFieldProps = NumberInputProps & {
  ref?: RefObject<HTMLInputElement | null>;
  onValueChange?: (value: string) => void;
  onValueChangeFinished?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

// Should be identical to InputField.types
export type InputFieldProps = {
  hasInputFocus: boolean;
  hasInputValue: boolean;
  hasButton?: boolean;
  readOnly?: boolean;
  floatingValidations?: FloatingValidation[];
  validations?: Validation[];
  isInputTouched?: boolean;
  value?: string;
  setHtmlFor?: boolean;
  input: (props: {
    id: string;
    isLabelFloating: boolean;
    inputStyles: SerializedStyles;
    buttonStyles: SerializedStyles;
  }) => ReactNode;
} & HTMLAttributes<HTMLDivElement> &
  Omit<FormComponentBaseProps, 'name'> &
  InputDescriptionProps;

// Should be identical to PasswordField.types
export type PasswordFieldProps = InputProps & {
  ref?: RefObject<HTMLInputElement | null>;
  allowShowPassword?: boolean;
  onValueChange?: (value: string) => void;
  onValueChangeFinished?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

// Should be identical to TextField.types
export type TextFieldProps = InputProps & {
  type?: string;
  validations?: Validation[];
  floatingValidations?: FloatingValidation[];
  onValueChange?: (value: string) => void;
  onValueChangeFinished?: (value: string) => void;
  renderButton?: (buttonStyles: SerializedStyles) => ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
