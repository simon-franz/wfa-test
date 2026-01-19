import { createContext } from 'react';

import type { ControlledCollapsibleMenuProps } from './CollapsibleMenu.types';

export type ControlledCollapsibleMenuContextProps = {
  isActive: (itemId: string) => boolean;
  isExpanded: (itemId: string) => boolean;
  expand: (expandedEntryIds: Array<string>) => void;
  collapse: (itemId: string) => void;
  updateActiveEntryId: ControlledCollapsibleMenuProps['updateActiveEntryId'];
  isParentExpanded: boolean;
  multiple?: boolean;
  nestingLevel?: number;
};

export const ControlledCollapsibleMenuContext = createContext<ControlledCollapsibleMenuContextProps>(
  {} as ControlledCollapsibleMenuContextProps,
);
