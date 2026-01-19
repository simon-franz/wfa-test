import type { HTMLAttributes } from 'react';

import type { HeadlessComboBoxOption } from '../../';

export type ComboBoxOptionProps = {
  option: HeadlessComboBoxOption;
  index: number;
} & HTMLAttributes<HTMLDivElement>;
