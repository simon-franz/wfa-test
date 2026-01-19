import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremSentences, generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';
import times from 'lodash/times';

import { patchEvent } from '../../utils/eventFunctions/patchEvent';
import { defaultFontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIconDefaultProps';
import { defaultImage } from '../Image/ImageDefaultProps';
import type { PortrayedListBackendProps } from '@hrworks/smartface/adapters/extension/PortrayedListAdapter/PortrayedListAdapter.types';

export const portrayedListDefaultProps: PortrayedListBackendProps = (() => {
  const item = () => {
    const sfId = getId();

    return {
      props: {
        title: generateLoremWords(),
        subtitle: generateLoremWords(),
        extrasChildren: [defaultFontAwesomeIcon()],
        media: defaultImage(),
        onClick: [patchEvent({ targetSfId: sfId, path: 'title', operation: 'write', value: generateLoremSentences() })],
      },
      sfId,
    };
  };

  return {
    hoverable: true,
    lineStyle: 'solid',
    items: [...times(6, () => item())],
  };
})();
