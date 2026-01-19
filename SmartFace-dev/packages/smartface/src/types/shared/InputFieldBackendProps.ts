import type { InputProps, NumberInputProps } from '@hrworks/types/shared/UiTypes';

import type { SfEventType } from './SfEventTypes';

export type InputBackendProps<T = string> = InputProps<T> & {
  onValueChange?: SfEventType;
  onEnterKeyDown?: SfEventType;
};

export type NumberInputBackendProps = NumberInputProps & {
  onValueChange?: SfEventType;
  onEnterKeyDown?: SfEventType;
};
