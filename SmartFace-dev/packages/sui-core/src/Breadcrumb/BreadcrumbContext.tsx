import type { Separator, Size } from '@hrworks/types/shared/UiTypes';
import { createContext } from 'react';

export type BreadcrumbContext = {
  size?: Size;
  separator?: Separator;
  uppercase?: boolean;
};

export const BreadcrumbContext = createContext<BreadcrumbContext>({} as BreadcrumbContext);
