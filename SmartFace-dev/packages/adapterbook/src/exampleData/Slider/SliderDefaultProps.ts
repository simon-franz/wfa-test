import { addNotification } from '../../utils/eventFunctions/addNotification';
import type { SliderBackendProps } from '@hrworks/smartface/adapters/extension/SliderAdapter/SliderAdapter.types';

export const sliderDefaultProps: SliderBackendProps = {
  value: 50,
  showTrack: true,
  color: 'primary',
  showTooltip: true,
  onValueChange: [addNotification()],
};
