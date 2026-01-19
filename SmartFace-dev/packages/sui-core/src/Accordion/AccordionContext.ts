import { createContext } from 'react';

import type { AccordionProps } from './Accordion.types';

export type AccordionContextProps = {
  expandedItemIds: string[];
  expandCollapseIcon: Required<AccordionProps['expandCollapseIcon']>;
  changeExpanded: (itemId: string, expanded: boolean) => void;
  itemSpacing?: boolean;
};

export const AccordionContext = createContext<AccordionContextProps>({} as AccordionContextProps);
