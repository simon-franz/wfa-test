import type { InputProps } from '@hrworks/types/shared/UiTypes';

import type { SfEventType } from '../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type TextFieldBackendProps = InputProps & {
  type?: string;
  onValueChange?: SfEventType;
  onEnterKeyDown?: SfEventType;
};

export type TextFieldBackendDefinition = SmartFaceBackendComponent<'TextField', TextFieldBackendProps>;

export type TextFieldAdapterProps = SmartFaceAdapterPropsType<TextFieldBackendDefinition>;
