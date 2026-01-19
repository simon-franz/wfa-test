import { observer } from 'mobx-react';
import { useState } from 'react';

import type { AccordionProps } from './Accordion.types';
import { ControlledAccordion } from './ControlledAccordion';

export const Accordion = observer((props: Omit<AccordionProps, 'updateExpandedItemIds' | 'expandedItemIds'>) => {
  const [expandedItemIds, setExpandedItemIds] = useState<AccordionProps['expandedItemIds']>([]);

  const updateExpandedItemIds = (
    _expandedItemIds: Parameters<NonNullable<AccordionProps['updateExpandedItemIds']>>[0],
  ) => {
    setExpandedItemIds(_expandedItemIds);
  };

  return (
    <ControlledAccordion expandedItemIds={expandedItemIds} updateExpandedItemIds={updateExpandedItemIds} {...props} />
  );
});
