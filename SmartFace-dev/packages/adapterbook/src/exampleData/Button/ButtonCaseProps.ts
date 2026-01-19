import { defaultFontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIconDefaultProps';
import type { ButtonBackendProps } from '@hrworks/smartface/adapters/core/ButtonAdapter/ButtonAdapter.types';

export const casePropsButtonColorWarning: ButtonBackendProps = {
  color: 'warning',
};

export const casePropsButtonWithLeftIcon: ButtonBackendProps = {
  leftIcon: defaultFontAwesomeIcon(),
};
