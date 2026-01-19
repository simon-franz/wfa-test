import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremParagraphs, generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { defaultText } from '../Text/TextDefaultProps';
import type { TabsBackendProps } from '@hrworks/smartface/adapters/core/TabsAdapter/TabsAdapter.types';

export const tabsDefaultProps: TabsBackendProps = (() => {
  const sfId = getId();

  return {
    selectedItemSfId: sfId,
    items: [
      {
        props: {
          title: generateLoremWords(),
          href: '',
          target: '_blank',
          onAfterSelect: [addNotification()],
          onDeselect: [addNotification()],
          componentChildren: [defaultText()],
        },
        sfId: sfId,
      },
      {
        props: {
          title: generateLoremWords(),
          onAfterSelect: [addNotification()],
          onDeselect: [addNotification()],
          componentChildren: [defaultText({ text: generateLoremParagraphs() })],
        },
        sfId: getId(),
      },
      {
        props: {
          title: generateLoremWords(),
          componentChildren: [defaultText()],
        },
        sfId: getId(),
      },
    ],
  };
})();
