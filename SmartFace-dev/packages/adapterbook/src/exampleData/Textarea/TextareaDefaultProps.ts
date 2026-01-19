import { addNotification } from '../../utils/eventFunctions/addNotification';
import { preset } from '../../utils/preset';
import type { TextareaBackendProps } from '@hrworks/smartface/adapters/core/TextareaAdapter/TextareaAdapter.types';

export const textareaDefaultProps: TextareaBackendProps = {
  ...preset.formDefaultProps,
  growsWithContent: true,
  resize: 'none',
  rows: 10,
  onValueChange: [addNotification()],
};
