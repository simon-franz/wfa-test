import getId from '@hrworks/sui-shared/functions/getId';
import {
  generateLoremParagraphs,
  generateLoremSentences,
  generateLoremWords,
} from '@hrworks/sui-shared/functions/stringGenerator';
import times from 'lodash/times';

import { preset } from '../../utils/preset';
import { defaultBadge } from '../Badge/BadgeDefaultProps';
import { defaultSwitch } from '../Switch/SwitchDefaultProps';
import { defaultText } from '../Text/TextDefaultProps';
import type { HrworksUserWhatsNewBackendProps } from '@hrworks/smartface/adapters/application/hrworks-user/HrworksUserWhatsNewAdapter/HrworksUserWhatsNewAdapter.types';

export const hrworksUserWhatsNewDefaultProps: HrworksUserWhatsNewBackendProps = {
  hero: {
    title: generateLoremWords(),
    subtitle: generateLoremSentences(),
    src: preset.getImageUrl(1600, 900),
    adminSwitch: defaultSwitch({ helpText: undefined }),
  },
  content: {
    spotlight: {
      statusBadge: defaultBadge({ text: generateLoremWords() }),
      date: generateLoremWords(),
      tags: times(3, () => generateLoremWords()),
      contentSrc: preset.pdfUrl,
      imgSrc: preset.getImageUrl(900, 1600),
      componentChildren: [defaultText({ text: generateLoremParagraphs() })],
    },
    previousNewsItems: times(4, () => ({
      props: {
        title: generateLoremWords(),
        date: generateLoremWords(),
        tags: times(3, () => generateLoremWords()),
        contentSrc: preset.pdfUrl,
      },
      sfId: getId(),
    })),
  },
};
