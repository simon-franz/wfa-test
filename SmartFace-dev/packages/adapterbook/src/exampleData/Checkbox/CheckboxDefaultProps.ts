import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { defaultFontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIconDefaultProps';
import type { CheckboxBackendProps } from '@hrworks/smartface/adapters/core/CheckboxAdapter/CheckboxAdapter.types';

export const checkboxDefaultProps: CheckboxBackendProps = {
  size: 'medium',
  checked: false,
  justifyContent: 'center',
  'aria-label': generateLoremWords(),
  label: generateLoremWords(),
  name: generateLoremWords(),
  labelChildren: [defaultFontAwesomeIcon()],
  onValueChange: [addNotification()],
};
