import type { ButtonBackendProps } from '../../../adapters/core/ButtonAdapter/ButtonAdapter.types.ts';
import type { IconBackendDefinition } from '../../../types/shared/BackendTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type IconButtonBackendProps = Omit<ButtonBackendProps, 'leftIcon' | 'rightIcon' | 'fullWidth' | 'text'> & {
  icon: IconBackendDefinition;
};
export type IconButtonBackendDefinition = SmartFaceBackendComponent<'IconButton', IconButtonBackendProps>;

export type IconButtonAdapterProps = SmartFaceAdapterPropsType<IconButtonBackendDefinition>;
