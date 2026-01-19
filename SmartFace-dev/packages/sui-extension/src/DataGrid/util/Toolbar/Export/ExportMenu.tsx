import { WARNING_CODES } from '@hrworks/error-handling';
import type { Cell, Column } from '@tanstack/react-table';
import { observer } from 'mobx-react';
import { useCallback, useContext, useEffect } from 'react';

import type { Row } from '../../../DataGrid.types';
import { DataGridContext } from '../../../DataGridContext';
import { S } from './ExportMenu.styles';
import type { ExportMenuProps } from './ExportMenu.types';

const print = (content: string, fileName: string) => {
  const encodedUri = encodeURI(content);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', fileName);
  document.body.append(link);
  link.click();
  link.remove();
};

const sanitizeCsvValue = (content: string | undefined) =>
  content ? (content.includes(';') ? `"${content}"` : content) : '';

const exportCsv = (columns: Column<Row, unknown>[], rows: Cell<Row, unknown>[][]) => {
  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += columns
    // @ts-expect-error TODO: Fix type
    .filter(({ columnDef }) => columnDef.meta?.printable === true)
    // @ts-expect-error TODO: Fix type
    .map(({ columnDef }) => sanitizeCsvValue(columnDef.meta?.label))
    .join(';');
  csvContent += '\n';
  csvContent += rows
    .map((row) =>
      row
        // @ts-expect-error TODO: Fix type
        .filter(({ column }) => column.columnDef.meta?.printable === true)
        .map(({ getValue }) => {
          const value = getValue();

          return value == null ? '' : sanitizeCsvValue('' + value);
        })
        .join(';'),
    )
    .join('\n');
  print(csvContent, 'csvfile.csv');
};

export const ExportMenu = observer((props: ExportMenuProps) => {
  const context = useContext(DataGridContext);

  useEffect(() => {
    console.warn(
      WARNING_CODES.INCOMPLETE_FEATURE,
      'You have the export menu enabled, which is not fully implemented and tested.',
    );
  }, []);

  const onExportVisibleAsCsv = useCallback(() => {
    context.table &&
      exportCsv(
        context.table.getVisibleLeafColumns(),
        context.table.getFilteredRowModel().rows.map(({ getVisibleCells }) => getVisibleCells()),
      );
  }, [context.table]);

  const onExportAllAsCsv = useCallback(() => {
    context.table &&
      exportCsv(
        context.table.getAllLeafColumns(),
        context.table.getFilteredRowModel().rows.map(({ getAllCells }) => getAllCells()),
      );
  }, [context.table]);

  return (
    <S.Menu {...props}>
      <S.Entry onClick={onExportVisibleAsCsv}>Export to CSV (only visible columns)</S.Entry>
      <S.Entry onClick={onExportAllAsCsv}>Export to CSV (all columns)</S.Entry>
    </S.Menu>
  );
});
