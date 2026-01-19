import { Table, TableBody, TableHead } from '@hrworks/sui-core/Table';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { TableDataRowAdapter } from './DataRow/TableDataRowAdapter';
import { TableHeaderRowAdapter } from './HeaderRow/TableHeaderRowAdapter';
import type { TableAdapterProps } from './TableAdapter.types';

export const TableAdapter = observer(({ headerRows, dataRows, ...otherProps }: TableAdapterProps) => {
  const _headerRows = mapSmartFaceComponentPartsToAdapter(TableHeaderRowAdapter, headerRows);
  const _dataRows = mapSmartFaceComponentPartsToAdapter(TableDataRowAdapter, dataRows);

  return (
    <Table {...otherProps}>
      <TableHead>{_headerRows}</TableHead>
      <TableBody>{_dataRows}</TableBody>
    </Table>
  );
});
