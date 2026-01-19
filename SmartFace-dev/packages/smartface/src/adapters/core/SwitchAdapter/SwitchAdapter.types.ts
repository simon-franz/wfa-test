import type { FormComponentProps, JustifyContent, Size } from '@hrworks/types/shared/UiTypes';

import type { SfEventType } from '../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type SwitchBackendProps = {
  checked?: boolean;
  justifyContent?: Exclude<JustifyContent, 'space-around' | 'space-evenly'>;
  size?: Size;
  onValueChange: SfEventType;
  labelChildren?: SmartFaceComponentsType[];
} & FormComponentProps;

export type SwitchBackendDefinition = SmartFaceBackendComponent<'Switch', SwitchBackendProps>;

export type SwitchAdapterProps = SmartFaceAdapterPropsType<SwitchBackendDefinition>;
