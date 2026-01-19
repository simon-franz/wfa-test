import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremSentences } from '@hrworks/sui-shared/functions/stringGenerator';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { preset } from '../../utils/preset';
import type { CmdTableBackendProps } from '@hrworks/smartface/adapters/application/onboarding/CmdTableAdapter/CmdTableAdapter.types';

export const cmdTableDefaultProps: CmdTableBackendProps = {
  items: [
    {
      props: {
        title: generateLoremSentences(),
        url: preset.pdfUrl,
        confirmed: false,
        onButtonClick: [addNotification()],
      },
      sfId: getId(),
    },
  ],
};
