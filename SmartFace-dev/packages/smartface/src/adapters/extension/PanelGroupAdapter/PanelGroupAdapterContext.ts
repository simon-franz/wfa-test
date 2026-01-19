import { createContext } from 'react';

type PanelGroupAdapterContextType = {
  lastItemSfId: string;
};

export const PanelGroupAdapterContext = createContext<PanelGroupAdapterContextType>({} as PanelGroupAdapterContextType);
