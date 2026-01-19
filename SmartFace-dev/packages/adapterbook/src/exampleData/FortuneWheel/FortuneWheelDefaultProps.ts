import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';
import times from 'lodash/times';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { preset } from '../../utils/preset';
import { defaultImage } from '../Image/ImageDefaultProps';
import type { FortuneWheelBackendProps } from '@hrworks/smartface/adapters/extension/FortuneWheelAdapter/FortuneWheelAdapter.types';

export const fortuneWheelDefaultProps: FortuneWheelBackendProps = {
  color: 'alternating',
  maxSize: 'small',
  onSpinComplete: [addNotification()],
  items: times(8, (count) => ({
    props: {
      text: generateLoremWords(),
      media: defaultImage({ src: preset.getImageUrl(500 + count, 500 + count) }),
    },
    sfId: getId(),
  })),
};
