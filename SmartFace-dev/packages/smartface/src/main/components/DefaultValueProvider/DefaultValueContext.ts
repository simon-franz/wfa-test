import type { Size } from '@hrworks/types/shared/UiTypes';
import { createContext } from 'react';

export type DefaultValueContext = {
  defaultSize?: Size;
  defaultFullHeight?: boolean;
};

export const DefaultValueContext = createContext<DefaultValueContext>({} as DefaultValueContext);
