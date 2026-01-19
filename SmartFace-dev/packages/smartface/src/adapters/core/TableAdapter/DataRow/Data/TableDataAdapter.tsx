import { TableData } from '@hrworks/sui-core/Table';
import { observer } from 'mobx-react';
import { type KeyboardEvent, type MouseEvent, type SyntheticEvent, useContext } from 'react';

import { mapSmartFaceComponentsToAdapters } from '../../../../../main/components/ComponentMapper';
import { SmartFaceContext } from '../../../../../main/components/SmartFaceContext';
import type { SfEventType } from '../../../../../types/shared/SfEventTypes';
import type { TableDataAdapterProps } from './TableDataAdapter.types';

export const TableDataAdapter = observer(({ componentChildren, onClick, ...otherProps }: TableDataAdapterProps) => {
  const { applyEvents } = useContext(SmartFaceContext);

  const onClickData = (event: SyntheticEvent<Element>, onClickFunction: SfEventType) => {
    event.preventDefault();
    event.stopPropagation();
    applyEvents(onClickFunction);
  };

  const _onClick =
    onClick &&
    ((event: KeyboardEvent<HTMLTableCellElement> | MouseEvent<HTMLTableCellElement>) => onClickData(event, onClick));

  const children = mapSmartFaceComponentsToAdapters(componentChildren);

  return <TableData onClick={_onClick} children={children} {...otherProps} />;
});
