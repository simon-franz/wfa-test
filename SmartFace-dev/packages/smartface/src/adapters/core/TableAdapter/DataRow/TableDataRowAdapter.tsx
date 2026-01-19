import { TableDataRow } from '@hrworks/sui-core/Table/TableDataRow/TableDataRow';
import { observer } from 'mobx-react';
import { type KeyboardEvent, type MouseEvent, type SyntheticEvent, useContext } from 'react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import type { SfEventType } from '../../../../types/shared/SfEventTypes';
import { TableDataAdapter } from './Data/TableDataAdapter';
import type { TableDataRowAdapterProps } from './TableDataRowAdapter.types';

export const TableDataRowAdapter = observer(({ cells, onClick, ...otherProps }: TableDataRowAdapterProps) => {
  const { applyEvents } = useContext(SmartFaceContext);

  const onClickData = (event: SyntheticEvent<Element>, onClickFunction: SfEventType) => {
    event.preventDefault();
    event.stopPropagation();
    applyEvents(onClickFunction);
  };

  const _onClick =
    onClick &&
    ((event: KeyboardEvent<HTMLTableRowElement> | MouseEvent<HTMLTableRowElement>) => onClickData(event, onClick));

  const children = mapSmartFaceComponentPartsToAdapter(TableDataAdapter, cells);

  return <TableDataRow onClick={_onClick} children={children} {...otherProps} />;
});
