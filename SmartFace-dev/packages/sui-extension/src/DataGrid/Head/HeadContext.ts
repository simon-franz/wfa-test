import { createContext, type Dispatch, type SetStateAction } from 'react';

export type DataGridHeadContext = {
  toolbarMenu: 'columns' | 'density' | null;
  setToolbarMenu: Dispatch<SetStateAction<DataGridHeadContext['toolbarMenu']>>;
};

export const DataGridHeadContext = createContext<DataGridHeadContext>({} as DataGridHeadContext);
