import { addNotification } from '../../utils/eventFunctions/addNotification';
import { preset } from '../../utils/preset';
import type { SqwSearchFieldBackendProps } from '@hrworks/smartface/adapters/application/hrworks-user/SqwSearchFieldAdapter/SqwSearchFieldAdapter.types';

export const sqwSearchFieldDefaultProps: SqwSearchFieldBackendProps = {
  ...preset.formDefaultProps,
  onEnterKeyDown: [addNotification()],
};
