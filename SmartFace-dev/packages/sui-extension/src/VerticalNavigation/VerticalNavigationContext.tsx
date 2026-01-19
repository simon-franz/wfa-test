import { createContext } from 'react';

import type { ControlledVerticalNavigationProps } from './VerticalNavigation.types';

export type VerticalNavigationContext = {
  isActive: (itemId: string) => boolean;
  setActiveItemId: ControlledVerticalNavigationProps['setActiveItemId'];
};

export const VerticalNavigationContext = createContext<VerticalNavigationContext>({} as VerticalNavigationContext);
