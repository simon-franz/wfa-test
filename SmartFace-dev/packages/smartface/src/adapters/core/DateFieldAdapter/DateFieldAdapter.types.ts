import type { DateFormat, Presentation } from '@hrworks/types/shared/UiTypes';

import type { InputBackendProps } from '../../../types/shared/InputFieldBackendProps';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type DateFieldBackendProps = InputBackendProps & {
  format?: DateFormat;
  minValue?: string | number;
  maxValue?: string | number;
  showMonthAndYearPicker?: boolean;
  presentation?: Presentation;
};

export type DateFieldBackendDefinition = SmartFaceBackendComponent<'DateField', DateFieldBackendProps>;

export type DateFieldAdapterProps = SmartFaceAdapterPropsType<DateFieldBackendDefinition>;
