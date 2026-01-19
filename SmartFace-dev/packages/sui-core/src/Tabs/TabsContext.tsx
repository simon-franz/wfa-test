import { createContext } from 'react';

type TabsContextProps = {
  isSelected: (id?: string) => boolean;
  updateSelectedItemId?: (id: string) => void;
  defaultSelectedItemId?: string;
  selectedItemId?: string;
  indicatorId: string;
  fullHeight?: boolean;
};

export const TabsContext = createContext<TabsContextProps>({} as TabsContextProps);
