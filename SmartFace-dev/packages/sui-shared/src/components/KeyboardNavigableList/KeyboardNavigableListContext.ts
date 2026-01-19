import { createContext } from 'react';

import type { getListItems, ListItem } from './getListMap';

export type KeyboardNavigableListContextType = {
  selectedItem: ListItem | null;
  openedSublists: ListItem['openedSublists'];
  setSelectedItem: (itemId: string) => void;
  listMap: ReturnType<typeof getListItems>['map'];
};

export const KeyboardNavigableListContext = createContext<KeyboardNavigableListContextType>(
  {} as KeyboardNavigableListContextType,
);
