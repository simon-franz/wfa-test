import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { preset } from '../../utils/preset';
import type { DateFieldBackendProps } from '@hrworks/smartface/adapters/core/DateFieldAdapter/DateFieldAdapter.types';

export const dateFieldDefaultProps: DateFieldBackendProps = {
  ...preset.formDefaultProps,
  ...preset.dateFieldDefaultProps,
  placeholder: generateLoremWords(),
  spellCheck: true,
  format: 'DDMMYYYY',
  disabled: false,
  onValueChange: [addNotification()],
};
