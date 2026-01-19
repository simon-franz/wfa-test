import ImageCropper from '@hrworks/sui-extension/ImageCropper';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';

import type { ImageCropperAdapterProps } from './ImageCropperAdapter.types';

export const ImageCropperAdapter = observer(
  ({ url = '', name = MISSING_STRING, ...otherProps }: ImageCropperAdapterProps) => (
    <ImageCropper url={url} name={name} {...otherProps} />
  ),
);
