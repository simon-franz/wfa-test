import type { HTMLAttributes } from 'react';

export type AccordionProps = {
  expandedItemIds: string[];
  updateExpandedItemIds: (expandedItemIds: AccordionProps['expandedItemIds']) => void;
  expandCollapseIcon?: 'arrow' | 'plus-minus';
  itemSpacing?: boolean;
  multiple?: boolean;
} & HTMLAttributes<HTMLDivElement>;
