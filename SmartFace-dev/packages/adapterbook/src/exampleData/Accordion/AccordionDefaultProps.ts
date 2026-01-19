import { generateLoremSentences } from '@hrworks/sui-shared/functions/stringGenerator';

import { defaultText } from '../Text/TextDefaultProps';
import type { AccordionBackendProps } from '@hrworks/smartface/adapters/core/AccordionAdapter/AccordionAdapter.types';

export const accordionDefaultProps: AccordionBackendProps = {
  items: [
    {
      props: {
        title: generateLoremSentences(1),
        componentChildren: [defaultText()],
      },
      sfId: 'first-text',
    },
    {
      props: {
        title: generateLoremSentences(1),
        componentChildren: [defaultText()],
      },
      sfId: 'second-text',
    },
  ],
  itemSpacing: true,
  expandCollapseIcon: 'arrow',
  expandedItemSfIds: ['second-text'],
};
