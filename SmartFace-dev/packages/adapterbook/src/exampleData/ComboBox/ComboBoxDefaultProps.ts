import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { preset } from '../../utils/preset';
import type { ComboBoxBackendProps } from '@hrworks/smartface/adapters/core/ComboBoxAdapter/ComboBoxAdapter.types';

export const comboBoxDefaultProps: ComboBoxBackendProps = {
  ...preset.formDefaultProps,
  getResultMinLength: 0,
  getResultDelay: 500,
  clearValueOnQueryChange: false,
  url: '/comboBox',
  multiple: false,
  value: { id: getId(), text: generateLoremWords(6) },
  onEnterKeyDown: [addNotification()],
};
