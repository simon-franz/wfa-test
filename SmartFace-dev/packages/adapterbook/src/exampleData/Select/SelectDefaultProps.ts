import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';
import times from 'lodash/times';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { preset } from '../../utils/preset';
import type { SelectBackendProps } from '@hrworks/smartface/adapters/core/SelectAdapter/SelectAdapter.types';

export const selectDefaultProps: SelectBackendProps = {
  ...preset.formDefaultProps,
  multiple: false,
  noneOption: { label: generateLoremWords(), sfId: getId() },
  options: [...times(8, (num) => ({ label: num + ' ' + generateLoremWords(), sfId: getId() }))],
  onValueChange: [addNotification()],
};
