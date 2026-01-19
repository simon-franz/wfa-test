import type { FormComponentBaseProps, Size } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

import type { CheckboxGroupOption } from '../CheckboxGroup.types';

export type CheckboxGroupListProps = {
  size?: Size;
  disabled?: boolean;
  validationState?: FormComponentBaseProps['validationState'];
  options: CheckboxGroupOption[];
  value?: CheckboxGroupOption['id'][];
  optionsDirection?: 'column' | 'row';
  noOptionsAvailableText?: string;
  onValueChange?: (value: CheckboxGroupListProps['value']) => void;
} & HTMLAttributes<HTMLDivElement>;
