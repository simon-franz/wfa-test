import type { HTMLAttributes, RefObject } from 'react';

import type { InputFieldProps } from '../../InputField/InputField.types';
import type { ComboBoxProps } from '../';

export type ComboBoxInputProps = {
  refs: RefObject<HTMLElement | null>[];
  noBlur?: boolean;
  isDropdown?: boolean;
  getResultMinLength?: number;
} & Omit<InputFieldProps, 'value' | 'input' | 'hasInputFocus' | 'hasInputValue'> &
  Pick<ComboBoxProps, 'clearValueOnFocus'> &
  HTMLAttributes<HTMLInputElement>;
