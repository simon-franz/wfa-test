export type HeadlessComboBoxOption<T extends object = Record<string, unknown>> = T & {
  id: string;
  text: string;
};

export type HeadlessComboBoxResponse = {
  results: HeadlessComboBoxOption[];

  pagination?: {
    more?: boolean;
  };
  clientSideFiltering?: boolean;
};

type SingleValue<TValue extends HeadlessComboBoxOption> = {
  value: TValue | null;
  onValueChange(value: TValue | null): void;
  multiple?: false;
  onValueChangeLazy?(value: TValue | null): void;
};

type MultipleValue<TValue extends HeadlessComboBoxOption> = {
  value: TValue[] | null;
  onValueChange(value: TValue[] | null): void;
  multiple: true;
  onValueChangeLazy?(value: TValue[] | null): void;
};

export type HeadlessControlledComboBoxValue<
  TValue extends HeadlessComboBoxOption,
  TMultiple extends boolean,
> = TMultiple extends true ? MultipleValue<TValue> : SingleValue<TValue>;

export type HeadlessComboBoxProps<TValue extends HeadlessComboBoxOption = HeadlessComboBoxOption> = {
  options: TValue[];
  query: string;
  getResultMinLength?: number;
  getResultDelay?: number;
  readOnly?: boolean;
  disabled?: boolean;
  onQueryChange(query: string): void;
};

export type HeadlessControlledComboBoxProps<
  TValue extends HeadlessComboBoxOption = HeadlessComboBoxOption,
  TMultiple extends boolean = boolean,
> = HeadlessComboBoxProps &
  HeadlessControlledComboBoxValue<TValue, TMultiple> & {
    alwaysOpenOnFocus: boolean;
  };
