import type { SelectOptionProps, SelectProps } from '../Select.types';

export type SelectListProps = Pick<SelectProps, 'options' | 'value' | 'noneOption'> & {
  flatOptions: SelectOptionProps[];
  onClickItem: (option: SelectOptionProps) => void;
  onClose: () => void;
};
