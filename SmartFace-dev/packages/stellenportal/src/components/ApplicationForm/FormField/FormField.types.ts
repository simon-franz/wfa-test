import type { VisibilityType } from '../../../types/post';
import type { FormFieldKeys } from '../ApplicationForm.types';
import type { GridItemSize } from '@hrworks/sui-core/GridItem/GridItem.types';
import type { SelectOptionProps } from '@hrworks/sui-core/Select/Select.types';

type Component = 'TextField' | 'DateField' | 'Select' | 'Textarea' | 'Checkbox' | 'CurrencySelect';

export type FormFieldProps = {
  fieldKey: FormFieldKeys;
  component?: Component;
  size?: GridItemSize;
  visibility?: VisibilityType;
  options?: SelectOptionProps[];
};
