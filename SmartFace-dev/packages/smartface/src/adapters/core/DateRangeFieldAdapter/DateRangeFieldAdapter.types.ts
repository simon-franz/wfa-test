import type { DateFormat, IsoDateRange, Presentation } from '@hrworks/types/shared/UiTypes';

import type { InputBackendProps } from '../../../types/shared/InputFieldBackendProps';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type DateRangeFieldBackendProps = InputBackendProps<IsoDateRange> & {
  startDate?: string;
  format?: DateFormat;
  minValue?: string | number;
  maxValue?: string | number;
  showMonthAndYearPicker?: boolean;
  presentation?: Presentation;
};

export type DateRangeFieldBackendDefinition = SmartFaceBackendComponent<'DateRangeField', DateRangeFieldBackendProps>;

export type DateRangeFieldAdapterProps = SmartFaceAdapterPropsType<DateRangeFieldBackendDefinition>;
