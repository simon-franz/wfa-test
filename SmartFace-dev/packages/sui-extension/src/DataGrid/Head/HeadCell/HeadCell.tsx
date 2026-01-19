import { useTheme } from '@emotion/react';
import Icon from '@hrworks/sui-core/Icon';
import { Float } from '@hrworks/sui-shared/components/Float';
import { flexRender } from '@tanstack/react-table';
import { observer } from 'mobx-react';
import { type MouseEventHandler, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import type { ColumnDefinition } from '../../DataGrid.types';
import { DataGridContext } from '../../DataGridContext';
import { S } from './HeadCell.styles';
import type { HeadCellProps } from './HeadCell.types';
import { HeadCellContextMenu } from './HeadCellContextMenu';

export const HeadCell = observer((props: HeadCellProps) => {
  const { children, header, ...otherProps } = props;
  const { density } = useContext(DataGridContext);
  const { onColumnSizeChange } = useContext(DataGridContext);
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Resizing columns with the resize line between head cells
  const resizeHandler = useCallback(
    (e: unknown) => {
      if (!header || !onColumnSizeChange) {
        return;
      }
      document.addEventListener('mouseup', () => onColumnSizeChange(header.column.id, header.getSize()), {
        once: true,
      });
      header.getResizeHandler()(e);
    },
    [header, onColumnSizeChange],
  );

  // Listener for closing the context menu
  useEffect(() => {
    const onClickOutside: EventListener = (event) => {
      if (
        showContextMenu &&
        !menuRef.current?.contains(event.target as HTMLElement) &&
        !buttonRef.current?.contains(event.target as HTMLElement)
      ) {
        setShowContextMenu(false);
      }
    };
    const onEscapePress = (event: KeyboardEvent) => {
      if (showContextMenu && event.key === 'Escape') {
        setShowContextMenu(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside, { capture: true });
    document.addEventListener('keydown', onEscapePress);

    return () => {
      document.removeEventListener('mousedown', onClickOutside, { capture: true });
      document.removeEventListener('keydown', onEscapePress);
    };
  }, [showContextMenu]);

  // Toggling context menu through right click or the triple dot button
  const toggleContextMenu = useCallback<MouseEventHandler>((e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowContextMenu((prevState) => !prevState);
  }, []);

  // Clicking on pin button to unpin
  const unpin = useCallback<MouseEventHandler>(
    (e) => {
      e.stopPropagation();
      header?.column.pin(false);
    },
    [header],
  );

  const closeMenu = useCallback<MouseEventHandler>((e) => {
    e.stopPropagation();
    setShowContextMenu(false);
  }, []);

  const canResize = useMemo(() => header?.column.getCanResize(), [header?.column]);
  const { sortDirection, isSorted } = useMemo(() => {
    const currentSortDirection = header?.column.getIsSorted();

    return {
      sortDirection: currentSortDirection || header?.column.getNextSortingOrder(),
      isSorted: !!currentSortDirection,
    };
  }, [header?.column]);
  const sortingFn = useMemo(
    () => (header?.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined),
    [header?.column],
  );
  const pinDirection = useMemo(() => header?.column.getIsPinned(), [header?.column]);

  const currentTheme = useTheme();

  return (
    <S.Cell isSorted={isSorted} pinDirection={pinDirection} {...otherProps}>
      <S.Resizer
        canResize={canResize}
        onMouseDown={resizeHandler}
        onTouchStart={resizeHandler}
        onClick={(e) => e.stopPropagation()}
      >
        <S.ResizerThumb />
      </S.Resizer>
      <S.InnerCell sortFnExists={sortingFn} density={density} onClick={sortingFn} onContextMenu={toggleContextMenu}>
        {pinDirection && (
          <S.PinButton variant="subtle" onClick={unpin}>
            <Icon name={pinDirection === 'left' ? 'data-grid-pin-left' : 'data-grid-pin-right'} />
          </S.PinButton>
        )}

        <S.Content justifyContent={(header?.column.columnDef.meta as ColumnDefinition | undefined)?.justifyContent}>
          <S.ContentWrapper>
            {!header || header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
          </S.ContentWrapper>
        </S.Content>
        {sortingFn && (
          <S.SortButton variant="subtle" $sortDirection={sortDirection} $isSorted={isSorted}>
            <Icon name="data-grid-sort-asc" />
          </S.SortButton>
        )}
        {header && (
          <Float
            show={showContextMenu}
            flip
            shift
            placement="bottom-end"
            fallbackPlacements={['top-end']}
            zIndex={currentTheme.marko.variables.zIndex.popover}
          >
            {({ getFloatStyles, floatRef, anchorRef }) => (
              <>
                <S.ContextMenuButton
                  variant="subtle"
                  ref={(ref) => {
                    buttonRef.current = ref;
                    anchorRef(ref);
                  }}
                  onClick={toggleContextMenu}
                >
                  <Icon name="data-grid-context-menu" />
                </S.ContextMenuButton>
                <HeadCellContextMenu
                  ref={(ref) => {
                    menuRef.current = ref;
                    floatRef(ref);
                  }}
                  header={header}
                  onClick={closeMenu}
                  style={getFloatStyles()}
                />
              </>
            )}
          </Float>
        )}
      </S.InnerCell>
    </S.Cell>
  );
});
