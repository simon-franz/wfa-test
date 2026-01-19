import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { defaultText } from '../Text/TextDefaultProps';
import type { PageBackendProps } from '@hrworks/smartface/adapters/core/PageAdapter/PageAdapter.types';

export const casePropsPageWithModal: PageBackendProps = {
  componentChildren: [defaultText()],
  document: {
    head: {
      title: generateLoremWords(),
      fields: {
        javascript: {
          tag: 'script',
          attributes: {},
          innerText: 'console.log("Hello from the Server")',
        },
      },
    },
  },
  modals: [
    {
      props: {
        closeable: true,
        size: 'medium',
        title: generateLoremWords(),
        entryAnimation: 'grow',
        exitAnimation: 'shrink',
        bodyChildren: [defaultText()],
      },
      sfId: getId(),
    },
  ],
};
