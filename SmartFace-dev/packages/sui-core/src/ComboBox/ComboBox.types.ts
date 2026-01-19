import type { InputDescriptionProps, Presentation, Size } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

import type {
  HeadlessComboBoxOption,
  HeadlessComboBoxResponse,
  HeadlessControlledComboBoxProps,
} from './HeadlessComboBox';

export type ComboBoxProps<
  TValue extends HeadlessComboBoxOption = HeadlessComboBoxOption,
  TMultiple extends boolean = boolean,
> = {
  clearValueOnQueryChange?: boolean;
  clearValueOnFocus?: boolean;
  presentation?: Presentation;
  alwaysOpenOnFocus?: boolean;
  size?: Size;
  name?: string;
  getOptions(query: string, page: number): Promise<HeadlessComboBoxResponse>;
  onQueryChange(query: string): void;
  onValueChangeLazy?: HeadlessControlledComboBoxProps<TValue, TMultiple>['onValueChange'];
} & Pick<
  HeadlessControlledComboBoxProps<TValue, TMultiple>,
  'multiple' | 'readOnly' | 'getResultDelay' | 'disabled' | 'value' | 'onValueChange' | 'query' | 'getResultMinLength'
> &
  HTMLAttributes<HTMLInputElement> &
  InputDescriptionProps;
