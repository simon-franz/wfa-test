import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';
import type { InputProps } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type PasswordFieldBackendProps = InputProps & {
  allowShowPassword?: boolean;
  onValueChange?: SfEventType;
  onEnterKeyDown?: SfEventType;
};

export type PasswordFieldBackendDefinition = SmartFaceBackendComponent<'PasswordField', PasswordFieldBackendProps>;

export type PasswordFieldAdapterProps = SmartFaceAdapterPropsType<PasswordFieldBackendDefinition>;
