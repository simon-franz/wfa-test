import type { Color } from '@hrworks/types/shared/UiTypes';

import type { SfEventType } from '../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type SliderBackendProps = {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  color?: Color;
  showTrack?: boolean;
  showTooltip?: boolean;
  onValueChange?: SfEventType;
};

export type SliderBackendDefinition = SmartFaceBackendComponent<'Slider', SliderBackendProps>;

export type SliderAdapterProps = SmartFaceAdapterPropsType<SliderBackendDefinition>;
