import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { generateProps } from '../../utils/generateProps';
import { preset } from '../../utils/preset';
import type { ImageBackendProps } from '@hrworks/smartface/adapters/core/ImageAdapter/ImageAdapter.types';

export const imageDefaultProps: ImageBackendProps = {
  src: preset.getImageUrl(),
  alt: generateLoremWords(),
  aspectRatio: '1 / 1',
  corner: 'rounded',
  onClick: [addNotification()],
  fallbackConfig: {
    fallbackSrc: 'https://placebear.com/200/300',
    numberOfRetries: 2,
    retryInterval: 1000,
  },
};

export const defaultImage = (props?: ImageBackendProps) => generateProps('Image', { ...imageDefaultProps, ...props });
