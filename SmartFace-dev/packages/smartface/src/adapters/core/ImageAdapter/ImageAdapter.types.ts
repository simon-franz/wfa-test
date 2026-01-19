import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';
import type { Corner } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type ImageBackendProps = {
  src: string;
  alt?: string;
  aspectRatio?: string;
  corner?: Exclude<Corner, 'pill'> | 'circular';
  fullWidth?: boolean;
  onClick?: SfEventType;
  fallbackConfig?: {
    fallbackSrc?: string;
    numberOfRetries?: number | 'infinite';
    retryInterval?: number;
  };
};

export type ImageBackendDefinition = SmartFaceBackendComponent<'Image', ImageBackendProps>;

export type ImageAdapterProps = SmartFaceAdapterPropsType<ImageBackendDefinition>;
