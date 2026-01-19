import { generateProps } from '@hrworks/adapterbook/utils/generateProps';

import { defaultFontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIconDefaultProps';
import type { IconButtonBackendProps } from '@hrworks/smartface/adapters/core/IconButtonAdapter/IconButtonAdapter.types';

export const iconButtonDefaultProps: IconButtonBackendProps = {
  icon: defaultFontAwesomeIcon(),
  color: 'primary',
  size: 'medium',
  variant: 'filled',
};

export const defaultIconButton = (props?: Partial<IconButtonBackendProps>) =>
  generateProps('IconButton', { ...iconButtonDefaultProps, ...props });
