import { createContext } from 'react';

import type { HeadlessComboBoxOption, HeadlessControlledComboBoxProps } from './';

export type HeadlessComboBoxContext = {
  activeItemIndex: number | null;
  disabled: Required<HeadlessControlledComboBoxProps>['disabled'];
  multiple: Required<HeadlessControlledComboBoxProps>['multiple'];
  open: boolean;
  options: HeadlessControlledComboBoxProps['options'];
  query: HeadlessControlledComboBoxProps['query'];
  readOnly: Required<HeadlessControlledComboBoxProps>['readOnly'];
  shouldGetResult: boolean;
  value: HeadlessControlledComboBoxProps<HeadlessComboBoxOption>['value'];
  clear(): void;
  isSelected(optionId: string): boolean;
  onQueryChange(query: HeadlessControlledComboBoxProps['query']): void;
  remove(id: string): void;
  select(option: HeadlessComboBoxOption): void;
  setActiveItemIndex(activeItemIndex: number | null): void;
  setOpen(open: boolean): void;
  alwaysOpenOnFocus: boolean;
};

export const HeadlessComboBoxContext = createContext<HeadlessComboBoxContext>({} as HeadlessComboBoxContext);
