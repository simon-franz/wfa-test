import { createContext } from 'react';

export type CardContextProps = {
  fullHeight?: boolean;
};

export const CardContext = createContext<CardContextProps>({} as CardContextProps);
