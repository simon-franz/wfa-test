import getId from '@hrworks/sui-shared/functions/getId';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { patchEvent } from '../../utils/eventFunctions/patchEvent';
import { defaultText } from '../Text/TextDefaultProps';
import type { CardBackendProps } from '@hrworks/smartface/adapters/core/CardAdapter/CardAdapter.types';

export const casePropsCardFullHeight: CardBackendProps = {
  fullHeight: true,
};

export const casePropsCardOnClick: CardBackendProps & { sfId: string } = (() => {
  const sfId = getId();

  return {
    title: 'Click me to change this title!',
    onClick: [
      patchEvent({ targetSfId: sfId, path: 'title', value: 'Title changed to something else!', operation: 'write' }),
      addNotification(),
    ],
    sfId,
  };
})();

export const casePropsCardWithFooter: CardBackendProps = {
  footerChildren: [defaultText()],
};
