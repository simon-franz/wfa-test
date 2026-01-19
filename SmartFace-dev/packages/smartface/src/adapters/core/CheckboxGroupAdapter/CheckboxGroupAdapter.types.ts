import type { FormComponentProps } from '@hrworks/types/shared/UiTypes';

import type { SfEventType } from '../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

type CheckboxGroupOption = {
  sfId: string;
  label: string;
};

export type CheckboxGroupBackendProps = FormComponentProps & {
  options: CheckboxGroupOption[];
  onValueChange: SfEventType;
  noOptionsAvailableText?: string;
  value?: CheckboxGroupOption['sfId'][];
  optionsDirection?: 'column' | 'row';
};

export type CheckboxGroupBackendDefinition = SmartFaceBackendComponent<'CheckboxGroup', CheckboxGroupBackendProps>;

export type CheckboxGroupAdapterProps = SmartFaceAdapterPropsType<CheckboxGroupBackendDefinition>;
