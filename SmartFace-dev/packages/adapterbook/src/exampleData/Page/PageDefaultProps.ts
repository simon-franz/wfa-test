import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { defaultText } from '../Text/TextDefaultProps';
import type { PageBackendProps } from '@hrworks/smartface/adapters/core/PageAdapter/PageAdapter.types';

export const pageDefaultProps: PageBackendProps = {
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
  modals: [],
};
