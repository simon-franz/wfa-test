import type { HTMLAttributes } from 'react';

import type { SelectOptionProps, SelectProps } from '../Select.types';

export type SelectTriggerProps = Pick<
  SelectProps,
  'options' | 'disabled' | 'noOptionSelectedText' | 'noOptionsAvailableText' | 'value' | 'multiple'
> & {
  hasOptions: boolean;
  noneOption?: SelectOptionProps;
} & HTMLAttributes<HTMLDivElement>;
