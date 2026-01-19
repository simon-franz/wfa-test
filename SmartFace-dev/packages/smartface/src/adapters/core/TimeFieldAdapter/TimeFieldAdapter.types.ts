import type { Presentation } from '@hrworks/types/shared/UiTypes';

import type { IconBackendDefinition } from '../../../types/shared/BackendTypes';
import type { InputBackendProps } from '../../../types/shared/InputFieldBackendProps';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type TimeFieldBackendProps = InputBackendProps & {
  timePickerToggleIcon?: IconBackendDefinition;
  timePickerMinutesStepSize?: number;
  presentation?: Presentation;
  showSeconds?: boolean;
};

export type TimeFieldBackendDefinition = SmartFaceBackendComponent<'TimeField', TimeFieldBackendProps>;

export type TimeFieldAdapterProps = SmartFaceAdapterPropsType<TimeFieldBackendDefinition>;
