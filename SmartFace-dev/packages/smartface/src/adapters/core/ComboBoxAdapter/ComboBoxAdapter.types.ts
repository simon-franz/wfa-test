import type { HeadlessComboBoxResponse } from '@hrworks/sui-core/ComboBox';
import type { Presentation } from '@hrworks/types/shared/UiTypes';

import type { SideEffectType } from '../../../types/shared/BackendResponseType/SideEffectTypes';
import type { InputBackendProps } from '../../../types/shared/InputFieldBackendProps';
import type { SfEventType } from '../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

type ComboBoxOption = {
  id: string;
  text: string;
};

type BaseComboBoxBackendProps = {
  onEnterKeyDown: SfEventType;
  clearValueOnQueryChange?: boolean;
  clearValueOnFocus?: boolean;
  url?: string;
  onValueChange?: SfEventType;
  presentation?: Presentation;
  alwaysOpenOnFocus?: boolean;
  query?: string;
  getResultMinLength?: number;
  getResultDelay?: number;
} & Omit<InputBackendProps, 'value' | 'onEnterKeyDown'>;

type SingleComboBoxBackendProps = BaseComboBoxBackendProps & {
  value: ComboBoxOption | null;
  multiple?: false;
};

type MultipleComboBoxBackendProps = BaseComboBoxBackendProps & {
  value: ComboBoxOption[];
  multiple: true;
};

export type ComboBoxBackendProps = SingleComboBoxBackendProps | MultipleComboBoxBackendProps;

export type ComboBoxBackendDefinition = SmartFaceBackendComponent<'ComboBox', ComboBoxBackendProps>;

export type ComboBoxAdapterProps = SmartFaceAdapterPropsType<ComboBoxBackendDefinition>;

export type ComboBoxResponseType = {
  data?: Partial<HeadlessComboBoxResponse>;
  sideEffects?: SideEffectType[];
};
