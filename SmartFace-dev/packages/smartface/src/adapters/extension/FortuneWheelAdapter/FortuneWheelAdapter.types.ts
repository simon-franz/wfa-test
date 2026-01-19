import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';
import type { Color, Size } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { FortuneWheelItemBackendDefinition } from './Item/FortuneWheelitemAdapter.types';

export type FortuneWheelBackendProps = {
  items: FortuneWheelItemBackendDefinition[];
  onSpinComplete?: SfEventType;
  color?: 'random' | 'alternating' | Color;
  maxSize?: Size;
  value?: string;
};

export type FortuneWheelBackendDefinition = SmartFaceBackendComponent<'FortuneWheel', FortuneWheelBackendProps>;

export type FortuneWheelAdapterProps = SmartFaceAdapterPropsType<FortuneWheelBackendDefinition>;
