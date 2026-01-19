import { addNotification } from '../../utils/eventFunctions/addNotification';
import { generateProps } from '../../utils/generateProps';
import { preset } from '../../utils/preset';
import { defaultFontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIconDefaultProps';
import type { SwitchBackendProps } from '@hrworks/smartface/adapters/core/SwitchAdapter/SwitchAdapter.types';

export const switchDefaultProps: SwitchBackendProps = {
  ...preset.formDefaultProps,
  labelChildren: [defaultFontAwesomeIcon()],
  checked: false,
  size: 'medium',
  justifyContent: 'center',
  onValueChange: [addNotification()],
};

export const defaultSwitch = (props?: Partial<SwitchBackendProps>) =>
  generateProps('Switch', { ...switchDefaultProps, ...props });
