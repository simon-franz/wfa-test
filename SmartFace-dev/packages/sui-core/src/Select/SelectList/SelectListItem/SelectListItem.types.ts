import type { HTMLAttributes } from 'react';

import type { SelectOptionProps, SelectProps } from '../../Select.types';

export type SelectListItemProps = Pick<SelectProps, 'value'> & {
  option: SelectOptionProps;
  flatOptions: SelectOptionProps[];
  noneOption?: SelectOptionProps;
  index: number;
  onClickItem: (option: SelectOptionProps) => void;
  onClose: () => void;
} & HTMLAttributes<HTMLElement>;
