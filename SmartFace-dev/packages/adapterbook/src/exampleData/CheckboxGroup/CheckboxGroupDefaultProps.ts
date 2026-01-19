import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { generateProps } from '../../utils/generateProps';
import { preset } from '../../utils/preset';
import type { CheckboxGroupBackendProps } from '@hrworks/smartface/adapters/core/CheckboxGroupAdapter/CheckboxGroupAdapter.types';

export const checkboxGroupDefaultProps: CheckboxGroupBackendProps = {
  ...preset.formDefaultProps,
  options: [
    {
      sfId: getId(),
      label: generateLoremWords(),
    },
    {
      sfId: getId(),
      label: generateLoremWords(),
    },
    {
      sfId: getId(),
      label: generateLoremWords(),
    },
  ],
  noOptionsAvailableText: generateLoremWords(),
  optionsDirection: 'column',
  onValueChange: [addNotification()],
};

export const defaultCheckboxGroup = (props?: Partial<CheckboxGroupBackendProps>) =>
  generateProps('CheckboxGroup', { ...checkboxGroupDefaultProps, ...props });
