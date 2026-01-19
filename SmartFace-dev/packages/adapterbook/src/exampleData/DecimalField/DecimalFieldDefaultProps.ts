import { addNotification } from '../../utils/eventFunctions/addNotification';
import { preset } from '../../utils/preset';
import type { DecimalFieldBackendProps } from '@hrworks/smartface/adapters/core/DecimalFieldAdapter/DecimalFieldAdapter.types';

export const decimalFieldDefaultProps: DecimalFieldBackendProps = {
  ...preset.formDefaultProps,
  max: 1000,
  min: -1000,
  scale: 4,
  radix: ',',
  mapToRadix: ['.'],
  thousandsSeparator: ' ',
  signed: false,
  normalizeZeros: false,
  padFractionalZeros: false,
  onValueChange: [addNotification()],
};
