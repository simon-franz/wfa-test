import type { SerializedStyles } from '@emotion/react';
import type {
  FloatingValidation,
  FormComponentBaseProps,
  InputDescriptionProps,
  Validation,
} from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

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
