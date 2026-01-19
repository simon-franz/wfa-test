import { observer } from 'mobx-react';
import { type KeyboardEvent, useContext } from 'react';

import { TableContext } from '../TableContext';
import { S } from './TableDataRow.styles';
import type { TableDataRowProps } from './TableDataRow.types';

export const TableDataRow = observer(({ onClick, ...otherProps }: TableDataRowProps) => {
  const { alternatingColors, hoverable } = useContext(TableContext);

  const onKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
    if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
      onClick!(event);
    }
  };

  return (
    <S.TableDataRow
      alternatingColors={alternatingColors}
      hoverable={hoverable}
      onClick={onClick}
      {...(onClick && { tabIndex: 0, onKeyDown: onKeyDown })}
      {...otherProps}
    />
  );
});
