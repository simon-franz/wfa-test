import { TableHeaderRow } from '@hrworks/sui-core/Table/TableHeaderRow/TableHeaderRow';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { TableHeaderAdapter } from '../HeaderRow/Header/TableHeaderAdapter';
import type { TableHeaderRowAdapterProps } from './TableHeaderRowAdapter.types';

export const TableHeaderRowAdapter = observer(({ cells, ...otherProps }: TableHeaderRowAdapterProps) => {
  const children = mapSmartFaceComponentPartsToAdapter(TableHeaderAdapter, cells);

  return <TableHeaderRow children={children} {...otherProps} />;
});
