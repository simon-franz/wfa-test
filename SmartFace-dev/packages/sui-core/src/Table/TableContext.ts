import { createContext } from 'react';

export type TableContext = {
  alternatingColors?: boolean;
  hoverable?: boolean;
  stickyHead?: boolean;
};

export const TableContext = createContext<TableContext>({} as TableContext);
