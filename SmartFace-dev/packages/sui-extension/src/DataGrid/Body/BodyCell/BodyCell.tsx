import { observer } from 'mobx-react';
import { useContext } from 'react';

import type { ColumnDefinition } from '../../DataGrid.types';
import { DataGridContext } from '../../DataGridContext';
import { S } from './BodyCell.styles';
import type { BodyCellProps } from './BodyCell.types';

export const BodyCell = observer(({ children, cell, ...otherProps }: BodyCellProps) => {
  const { density } = useContext(DataGridContext);
  const pinDirection = cell.column.getIsPinned();
  const justifyContent = (cell.column.columnDef.meta as ColumnDefinition | undefined)?.justifyContent;

  // For pinning columns left or right in a performant way. I surrendered.
  // Maybe some of this stuff can be calculated once in column meta instead of in every cell
  // const pinOffset = useMemo(() => {
  //   if (!pinDirection) {
  //     return 0;
  //   }
  //   const id = cell.column.id;
  //   const pinnedCells = pinDirection === 'left' ? cell.row.getLeftVisibleCells() : cell.row.getRightVisibleCells();
  //   let offset = 0;
  //   for (const pinnedCell of pinnedCells) {
  //     if (pinnedCell.column.id === id) {
  //       return offset;
  //     } else {
  //       offset += pinnedCell.column.getSize();
  //     }
  //   }
  //   return 0;
  // }, [pinDirection, cell.row, cell.column.id]);

  return (
    <S.Cell pinDirection={pinDirection} {...otherProps}>
      <S.Content justifyContent={justifyContent} density={density}>
        {children}
      </S.Content>
    </S.Cell>
  );
});
