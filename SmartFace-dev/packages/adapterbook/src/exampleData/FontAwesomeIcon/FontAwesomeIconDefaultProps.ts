import { generateProps } from '../../utils/generateProps';
import type { FontAwesomeIconBackendProps } from '@hrworks/smartface/adapters/core/FontAwesomeIconAdapter/FontAwesomeIconAdapter.types';

export const fontAwesomeIconDefaultProps: FontAwesomeIconBackendProps = {
  name: 'alien',
  variant: 'duotone',
};

export const defaultFontAwesomeIcon = (props?: Partial<FontAwesomeIconBackendProps>) =>
  generateProps('FontAwesomeIcon', { ...fontAwesomeIconDefaultProps, ...props });
