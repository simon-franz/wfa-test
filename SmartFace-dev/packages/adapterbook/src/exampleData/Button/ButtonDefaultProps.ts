import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { patchEvent } from '../../utils/eventFunctions/patchEvent';
import { generateProps } from '../../utils/generateProps';
import type {
  ButtonAdapterProps,
  ButtonBackendProps,
} from '@hrworks/smartface/adapters/core/ButtonAdapter/ButtonAdapter.types';

export const buttonDefaultProps: ButtonBackendProps & { sfId: string } = (() => {
  const sfId = getId();

  return {
    color: 'primary',
    text: generateLoremWords(),
    onClick: [
      patchEvent({ targetSfId: sfId, path: 'text', value: 'New Value', operation: 'write' }),
      addNotification(),
    ],
    sfId,
  };
})();

export const defaultButton = (props?: Partial<ButtonAdapterProps>) =>
  generateProps('Button', { ...buttonDefaultProps, ...props });
