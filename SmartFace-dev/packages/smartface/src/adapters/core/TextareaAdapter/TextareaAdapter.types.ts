import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';
import type { Direction, InputProps } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type TextareaBackendProps = InputProps & {
  resize?: Direction | 'both' | 'none';
  rows?: number;
  growsWithContent?: boolean;
  onValueChange?: SfEventType;
};

export type TextareaBackendDefinition = SmartFaceBackendComponent<'Textarea', TextareaBackendProps>;

export type TextareaAdapterProps = SmartFaceAdapterPropsType<TextareaBackendDefinition>;
