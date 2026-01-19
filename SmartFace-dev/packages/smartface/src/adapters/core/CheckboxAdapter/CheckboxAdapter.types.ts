import type { FormComponentProps, JustifyContent, Size } from '@hrworks/types/shared/UiTypes';

import type { SfEventType } from '../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type CheckboxBackendProps = FormComponentProps & {
  size?: Size;
  checked?: boolean;
  justifyContent?: Exclude<JustifyContent, 'space-around' | 'space-evenly'>;
  labelChildren?: SmartFaceComponentsType[];
  onValueChange: SfEventType;
};

export type CheckboxBackendDefinition = SmartFaceBackendComponent<'Checkbox', CheckboxBackendProps>;

export type CheckboxAdapterProps = SmartFaceAdapterPropsType<CheckboxBackendDefinition>;
