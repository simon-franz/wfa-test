import type { SelectProps, SingleSelectValueProps } from '@hrworks/sui-core/Select/Select.types';

export type CurrencySelectProps = Omit<SelectProps, 'options' | 'value'> & SingleSelectValueProps;
