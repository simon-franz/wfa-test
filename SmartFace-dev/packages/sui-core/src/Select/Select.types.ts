import type { FormComponentProps } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode, RefObject } from 'react';

export type SelectOptionProps = {
  label: string;
  value: string;
  options?: SelectOptionProps[];
  media?: ReactNode;
};

export type SingleSelectValueProps = {
  multiple?: false;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

type MultiSelectValueProps = {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};

type SelectValueProps = SingleSelectValueProps | MultiSelectValueProps;

export type SelectProps = {
  options: SelectOptionProps[];
  noneOption?: Omit<SelectOptionProps, 'options'>;
  noOptionsAvailableText?: string;
  noOptionSelectedText?: string;
  alwaysOpenOnFocus?: boolean;
  dropdownWidth?: 'auto' | 'limited';
  id?: string;
  ref?: RefObject<HTMLInputElement | null>;
  onValueChangeFinished?: () => void;
} & SelectValueProps &
  FormComponentProps &
  Omit<HTMLAttributes<HTMLElement>, 'defaultValue'>;
