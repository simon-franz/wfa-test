import { createContext } from 'react';

export type SqwLayoutContextProps = {
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: (value: boolean) => void;
};

export const SqwLayoutContext = createContext<SqwLayoutContextProps>({} as SqwLayoutContextProps);
