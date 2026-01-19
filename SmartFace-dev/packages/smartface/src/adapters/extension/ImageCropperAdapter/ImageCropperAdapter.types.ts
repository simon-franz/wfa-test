import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type ImageCropperBackendProps = {
  url: string;
  name: string;
};

export type ImageCropperBackendDefinition = SmartFaceBackendComponent<'ImageCropper', ImageCropperBackendProps>;

export type ImageCropperAdapterProps = SmartFaceAdapterPropsType<ImageCropperBackendDefinition>;
