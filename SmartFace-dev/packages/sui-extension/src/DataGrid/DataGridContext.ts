import type { Rename } from '@hrworks/types/shared/helpers';
import type { Table } from '@tanstack/react-table';
import { createContext, type useRef } from 'react';

import type { DataGridProps } from './DataGrid.types';

export type DataGridContext = {
  table?: Table<DataGridProps['rows'][0]>;
  tableRef: ReturnType<typeof useRef<HTMLDivElement | null>>;
  toolbarConfig: Rename<Required<Exclude<Required<DataGridProps>['toolbar'], boolean>>, 'export', 'exports'>;
  density: Required<DataGridProps>['density'];
  onDensityChange: Required<DataGridProps>['onDensityChange'];
  onColumnSizeChange: (id: string, size: number) => void;
};

export const DataGridContext = createContext<DataGridContext>({} as DataGridContext);
