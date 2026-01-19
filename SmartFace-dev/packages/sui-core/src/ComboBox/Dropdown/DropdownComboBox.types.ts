import type { Size } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

import type { useCache } from '../';
import type { ComboBoxInputProps } from '../Input';

export type DropdownComboBoxProps = {
  inputProps: Omit<ComboBoxInputProps, 'refs'>;
  currentCache: ReturnType<ReturnType<typeof useCache>['getCurrentCache']>;
  open: boolean;
  shouldGetResult: boolean;
  getResult(query: string): Promise<void>;
  getResultMinLength: number;
  isDropdown: boolean;
  size?: Size;
} & HTMLAttributes<HTMLDivElement>;
