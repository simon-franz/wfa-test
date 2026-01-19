import type { Size } from '@hrworks/types/shared/UiTypes';
import { createContext } from 'react';

type NestedChecklistContext = {
  size?: Size;
};

export const NestedChecklistContext = createContext<NestedChecklistContext>({} as NestedChecklistContext);
