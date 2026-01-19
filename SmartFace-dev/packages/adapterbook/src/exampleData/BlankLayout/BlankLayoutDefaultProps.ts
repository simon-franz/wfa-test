import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremSentences, generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { preset } from '../../utils/preset';
import { defaultFontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIconDefaultProps';
import type { BlankLayoutBackendProps } from '@hrworks/smartface/adapters/core/BlankLayoutAdapter/BlankLayoutAdapter.types';

export const blankLayoutDefaultProps: BlankLayoutBackendProps = {
  componentChildren: [
    {
      props: {
        media: defaultFontAwesomeIcon(),
        statusCode: generateLoremWords(),
        title: generateLoremSentences(),
        subtitle: generateLoremSentences(),
      },
      sfId: getId(),
      sfComponent: 'ServerStatus',
    },
  ],
  logo: preset.logoDefaultProps,
  borderless: false,
};
