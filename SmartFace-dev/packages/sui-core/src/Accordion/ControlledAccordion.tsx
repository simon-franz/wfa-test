import { observer } from 'mobx-react';
import { useCallback, useMemo } from 'react';

import type { AccordionProps } from './Accordion.types';
import { AccordionContext } from './AccordionContext';

export const ControlledAccordion = observer(
  ({
    children,
    expandCollapseIcon = 'arrow',
    itemSpacing,
    expandedItemIds: _expandedItemIds,
    updateExpandedItemIds,
    multiple,
    ...otherProps
  }: AccordionProps) => {
    const expandedItemIds = useMemo<AccordionProps['expandedItemIds']>(() => {
      if (multiple) {
        return [..._expandedItemIds];
      }
      const lastItemId = _expandedItemIds.at(-1);

      return lastItemId ? [lastItemId] : [];
    }, [_expandedItemIds, multiple]);

    const changeExpanded = useCallback(
      (itemId: string, expanded: boolean) => {
        if (expanded) {
          if (multiple) {
            updateExpandedItemIds([...expandedItemIds, itemId]);
          } else {
            updateExpandedItemIds([itemId]);
          }
        } else {
          updateExpandedItemIds(expandedItemIds.filter((item) => item !== itemId));
        }
      },
      [expandedItemIds, multiple, updateExpandedItemIds],
    );

    return (
      <div {...otherProps}>
        <AccordionContext.Provider
          value={{
            expandedItemIds,
            expandCollapseIcon,
            changeExpanded: changeExpanded,
            itemSpacing,
          }}
        >
          {children}
        </AccordionContext.Provider>
      </div>
    );
  },
);
