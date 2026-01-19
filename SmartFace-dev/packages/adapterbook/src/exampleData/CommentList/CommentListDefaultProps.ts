import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremParagraphs, generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import type { CommentListBackendProps } from '@hrworks/smartface/adapters/application/cd/CommentListAdapter/CommentListAdapter.types';

export const commentListDefaultProps: CommentListBackendProps = {
  items: [
    {
      props: {
        signature: generateLoremWords(),
        text: generateLoremParagraphs(),
      },
      sfId: getId(),
    },
  ],
  textUrlMaxLength: 15,
};
