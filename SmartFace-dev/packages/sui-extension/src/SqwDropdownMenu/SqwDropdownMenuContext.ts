import { createContext } from 'react';

import type { SqwDropdownMenuProps } from './SqwDropdownMenu.types';

export type SqwDropdownMenuContext = {
  toggleDropdown: () => void;
  closeDropdown: () => void;
  expanded: boolean;
  presentation: SqwDropdownMenuProps['presentation'];
};

export const SqwDropdownMenuContext = createContext<SqwDropdownMenuContext>({} as SqwDropdownMenuContext);
