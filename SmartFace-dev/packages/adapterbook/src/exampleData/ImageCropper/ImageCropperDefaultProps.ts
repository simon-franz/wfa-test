import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { preset } from '../../utils/preset';
import type { ImageCropperBackendProps } from '@hrworks/smartface/adapters/extension/ImageCropperAdapter/ImageCropperAdapter.types';

export const imageCropperDefaultProps: ImageCropperBackendProps = {
  name: generateLoremWords(),
  url: preset.getImageUrl(),
};
