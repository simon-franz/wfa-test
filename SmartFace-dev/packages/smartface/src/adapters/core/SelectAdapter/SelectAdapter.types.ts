import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';
import type { FormComponentProps } from '@hrworks/types/shared/UiTypes';

import type { IconBackendDefinition } from '../../../types/shared/BackendTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { ImageBackendDefinition } from '../ImageAdapter/ImageAdapter.types';

export type SelectOptionBackendProps = {
  label: string;
  sfId: string;
  media?: ImageBackendDefinition | IconBackendDefinition;
  options?: SelectOptionBackendProps[];
};

type Value =
  | {
      value?: string[];
      multiple?: true;
    }
  | {
      value?: string;
      multiple?: false;
    };

export type SelectBackendProps = {
  options: SelectOptionBackendProps[];
  noneOption?: Omit<SelectOptionBackendProps, 'options'>;
  noOptionsAvailableText?: string;
  noOptionSelectedText?: string;
  alwaysOpenOnFocus?: boolean;
  dropdownWidth?: 'auto' | 'limited';
  onValueChange?: SfEventType;
} & FormComponentProps &
  Value;

export type SelectBackendDefinition = SmartFaceBackendComponent<'SelectBox', SelectBackendProps>;

export type SelectAdapterProps = SmartFaceAdapterPropsType<SelectBackendDefinition>;
