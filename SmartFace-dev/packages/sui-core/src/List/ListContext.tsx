import { createContext } from 'react';

type ListContextProps = {
  isSelected: (itemId: string) => boolean;
  hoverable: boolean;
};

export const ListContext = createContext<ListContextProps>({} as ListContextProps);
