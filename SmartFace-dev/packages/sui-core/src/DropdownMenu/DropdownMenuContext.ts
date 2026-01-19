import { createContext } from 'react';

import type { DropdownMenuProps } from './DropdownMenu.types';

export type DropdownMenuContext = {
  toggleDropdown: () => void;
  closeDropdown: () => void;
  expanded: boolean;
  presentation: DropdownMenuProps['presentation'];
};

export const DropdownMenuContext = createContext<DropdownMenuContext>({} as DropdownMenuContext);
