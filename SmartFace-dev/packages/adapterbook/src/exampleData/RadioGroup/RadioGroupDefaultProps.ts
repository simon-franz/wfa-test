import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';
import times from 'lodash/times';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { preset } from '../../utils/preset';
import type { RadioGroupBackendProps } from '@hrworks/smartface/adapters/core/RadioGroupAdapter/RadioGroupAdapter.types';

export const radioGroupDefaultProps: RadioGroupBackendProps = {
  ...preset.formDefaultProps,
  options: times(5, () => ({ sfId: getId(), label: generateLoremWords() })),
  onValueChange: [addNotification()],
};
