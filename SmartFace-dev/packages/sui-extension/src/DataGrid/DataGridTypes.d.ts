import type { RowData } from '@tanstack/react-table';

import type { ColumnDefinition } from './DataGrid.types';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    justifyContent: ColumnDefinition['justifyContent'];
    printable: boolean | 'graphical';
    label?: string;
    data?: ColumnDefinition['data'];
  }
}
