import { LocalizationContext } from '@hrworks/localization';
import { observer } from 'mobx-react';
import { forwardRef, useContext } from 'react';

import { S } from './HeadCellContextMenu.styles';
import type { HeadCellContextMenuProps } from './HeadCellContextMenu.types';
import { HeadCellContextMenuItem } from './Item/HeadCellContextMenuItem';

export const HeadCellContextMenu = observer(
  forwardRef<HTMLDivElement, HeadCellContextMenuProps>(({ header, ...otherProps }, ref) => {
    const { translate } = useContext(LocalizationContext);
    const currentSort = header?.column.getIsSorted();
    const currentPin = header?.column.getIsPinned();

    return (
      <S.Wrapper ref={ref} {...otherProps}>
        <S.Menu>
          {header?.column.getCanSort() && (
            <>
              {currentSort !== 'asc' && (
                <HeadCellContextMenuItem
                  iconName="data-grid-sort-asc"
                  onClick={() => header.column.toggleSorting(false)}
                >
                  {translate('datagrid-sort-ascending')}
                </HeadCellContextMenuItem>
              )}
              {currentSort !== 'desc' && (
                <HeadCellContextMenuItem
                  iconName="data-grid-sort-desc"
                  onClick={() => header.column.toggleSorting(true)}
                >
                  {translate('datagrid-sort-descending')}
                </HeadCellContextMenuItem>
              )}
              {currentSort && (
                <HeadCellContextMenuItem onClick={() => header.column.clearSorting()}>
                  {translate('datagrid-sort-reset')}
                </HeadCellContextMenuItem>
              )}
            </>
          )}
          {header?.column.getCanPin() && (
            <>
              {header?.column.getCanSort() && <S.Divider />}
              {currentPin !== 'left' && (
                <HeadCellContextMenuItem iconName="data-grid-pin-left" onClick={() => header.column.pin('left')}>
                  {translate('datagrid-pin-left')}
                </HeadCellContextMenuItem>
              )}
              {currentPin !== 'right' && (
                <HeadCellContextMenuItem iconName="data-grid-pin-right" onClick={() => header.column.pin('right')}>
                  {translate('datagrid-pin-right')}
                </HeadCellContextMenuItem>
              )}
              {currentPin && (
                <HeadCellContextMenuItem onClick={() => header.column.pin(false)}>
                  {translate('datagrid-unpin')}
                </HeadCellContextMenuItem>
              )}
            </>
          )}
        </S.Menu>
      </S.Wrapper>
    );
  }),
);
