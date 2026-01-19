import type { FormComponentProps, InputDescriptionProps } from '@hrworks/types/shared/UiTypes';

import type { SfEventType } from '../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

type RadioGroupOption = {
  sfId: string;
  label: string;
};

export type RadioGroupBackendProps = FormComponentProps &
  InputDescriptionProps & {
    options: RadioGroupOption[];
    noOptionsAvailableText?: string;
    value?: RadioGroupOption['sfId'];
    optionsDirection?: 'column' | 'row';
    onValueChange: SfEventType;
  };

export type RadioGroupBackendDefinition = SmartFaceBackendComponent<'RadioGroup', RadioGroupBackendProps>;

export type RadioGroupAdapterProps = SmartFaceAdapterPropsType<RadioGroupBackendDefinition>;
