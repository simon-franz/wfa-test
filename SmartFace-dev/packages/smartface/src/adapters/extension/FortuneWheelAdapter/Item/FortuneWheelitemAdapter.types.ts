import type { Color } from '@hrworks/types/shared/UiTypes';

import type { IconBackendDefinition } from '../../../../types/shared/BackendTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';
import type { ImageBackendDefinition } from '../../../core/ImageAdapter/ImageAdapter.types';
import type { AfterEffectsMediaBackendDefinition } from '../../../extension/AfterEffectsMediaAdapter/AfterEffectsMediaAdapter.types';

type FortuneWheelItemBackendProps = {
  text?: string;
  media?: ImageBackendDefinition | IconBackendDefinition | AfterEffectsMediaBackendDefinition;
  color?: Color;
};

export type FortuneWheelItemBackendDefinition = SmartFaceBackendComponentPart<FortuneWheelItemBackendProps>;

export type FortuneWheelItemAdapterProps = SmartFaceAdapterPropsType<FortuneWheelItemBackendDefinition>;
