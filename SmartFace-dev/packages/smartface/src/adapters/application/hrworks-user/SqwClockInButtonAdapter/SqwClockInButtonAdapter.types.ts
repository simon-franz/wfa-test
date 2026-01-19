import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../../types/SmartFaceComponent';
import type { DropdownMenuBackendDefinition } from '../../../core/DropdownMenuAdapter/DropdownMenuAdapter.types';

export type SqwClockInButtonBackendProps = {
  label?: string;
  projectOrActivityDropdown?: DropdownMenuBackendDefinition;
  projectOrActivityLabel?: string;
  onClockIn?: SfEventType;
  onClockOut?: SfEventType;
  startDateTime?: string;
  isActive?: boolean;
};

export type SqwClockInButtonBackendDefinition = SmartFaceBackendComponent<
  'SqwClockInButton',
  SqwClockInButtonBackendProps
>;

export type SqwClockInButtonAdapterProps = SmartFaceAdapterPropsType<SqwClockInButtonBackendDefinition>;
