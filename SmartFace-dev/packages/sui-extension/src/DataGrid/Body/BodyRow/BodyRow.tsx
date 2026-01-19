import { flexRender } from '@tanstack/react-table';
import { observer } from 'mobx-react';

import { BodyCell } from '../BodyCell';
import { S } from './BodyRow.styles';
import type { BodyRowProps } from './BodyRow.types';

export const BodyRow = observer(({ row, ...otherProps }: BodyRowProps) => {
  const firstVisibleCell = row.getVisibleCells()[0];

  // No cells are visible, render nothing
  if (!firstVisibleCell) return null;

  return (
    <S.Row {...otherProps}>
      {/* TODO icon is not rotating */}
      <S.BodyCell cell={firstVisibleCell}>
        <S.GroupingCell rowDepth={row.depth}>
          {row.getCanExpand() && (
            <S.ExpansionButton
              $rowDepth={row.depth}
              expanded={row.getIsExpanded()}
              onClick={(e) => {
                e.stopPropagation();
                row.getToggleExpandedHandler()();
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
            />
          )}
          {flexRender(firstVisibleCell.column.columnDef.cell, firstVisibleCell.getContext())}
        </S.GroupingCell>
      </S.BodyCell>
      {row
        .getVisibleCells()
        .slice(1)
        .map((cell) => (
          <BodyCell key={cell.id} cell={cell}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </BodyCell>
        ))}
    </S.Row>
  );
});
