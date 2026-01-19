import type { Size } from '@hrworks/types/shared/UiTypes';
import { createContext, type Dispatch, type SetStateAction } from 'react';

export type SelectContext = {
  activeItemValue: string | null;
  setActiveItemValue: Dispatch<SetStateAction<string | null>>;
  value: string | string[];
  multiple: boolean;
  size: Size;
};

export const SelectContext = createContext<SelectContext>({} as SelectContext);
