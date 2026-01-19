/* eslint-disable unicorn/prefer-object-from-entries */
/* eslint-disable unicorn/no-array-reduce */
import { LocalizationContext } from '@hrworks/localization';
import { usePrevious } from '@hrworks/sui-shared/hooks/usePrevious';
import {
  type CellContext,
  type ColumnDef,
  type ColumnDefTemplate,
  type ColumnPinningState,
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  type OnChangeFn,
  type SortingState,
  type TableState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { observer } from 'mobx-react';
import { type ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import './DataGridTypes.d';
import { BodyRow } from './Body/BodyRow';
import type { BodyRowProps } from './Body/BodyRow/BodyRow.types';
import { BooleanData } from './Data/BooleanData';
import { DateData } from './Data/DateData';
import { ImageData } from './Data/ImageData';
import { StringData } from './Data/StringData';
import { densities, S } from './DataGrid.styles';
import type { DataGridColumn, DataGridProps, Row } from './DataGrid.types';
import { DataGridContext } from './DataGridContext';
import { Head } from './Head';
import { HeadRow } from './Head/HeadRow';

const cellContextFns: Record<DataGridColumn, Exclude<ColumnDefTemplate<CellContext<Row[], ReactNode>>, string>> = {
  string: (info) => <StringData>{info.getValue()}</StringData>,
  boolean: (info) => <BooleanData value={info.getValue()} />,
  date: (info) => <DateData value={info.getValue()} />, // TODO type Date for optimal filtering
  image: (info) => <ImageData value={info.getValue()} />,
  number: (info) => <div>{info.getValue()}</div>,
  singleSelect: (info) => <div>{info.getValue()}</div>, // TODO not yet implemented
  // @ts-expect-error TODO: Fix type
  componentChildren: (info) => <>{info.column.columnDef.meta?.data?.(info.getValue() as unknown[])}</>,
  // @ts-expect-error TODO: Fix type
  template: (info) => <>{info.column.columnDef.meta?.data?.(info.getValue() as object)}</>,
} as const;

function getLastElement<R>(array: R[] = []): R | undefined {
  return array.length === 0 ? undefined : array.at(-1);
}

export const DataGrid = observer(
  ({
    rows,
    columnDefinitions,
    disableUnsort,
    onColumnDefinitionsChange,
    onFetchRows,
    pinnedColumns,
    onPinnedColumnsChange,
    sorts,
    onSortsChange,
    pagination,
    selectableRows,
    density = 'medium',
    clientSideSort,
    virtualizationOverscan = 5,
    onDensityChange = () => null,
    fullHeight,
    toolbar,
    loadingAnimation = true,
    ...otherProps
  }: DataGridProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLDivElement>(null);
    const [isRequesting, setIsRequesting] = useState(false);
    const columnHelper = useMemo(() => createColumnHelper<DataGridProps['rows']>(), []);
    const previousRows = usePrevious(rows);
    const { translate } = useContext(LocalizationContext);

    // Scroll back to top if we have less rows after rerender (e.g. after filter or backend-sort)
    useEffect(() => {
      if (containerRef.current && (!previousRows || rows.length < previousRows.length)) {
        containerRef.current?.scrollTo(0, 0);
      }
    }, [previousRows, rows.length]);

    const modifiedColumns = useMemo<ColumnDef<Row, unknown>[]>(
      () =>
        columnDefinitions
          .filter(({ id }) => id !== 'id')
          .map(
            ({
              label,
              columnsMenuLabel,
              id,
              type,
              justifyContent,
              width,
              minWidth,
              maxWidth,
              sortable = true,
              resizable = true,
              pinnable = true,
              hideable = true,
              primarySortDirection = 'asc',
              data,
            }) => {
              const generalProps = {
                id,
                header: () => <span>{label}</span>,
                cell: cellContextFns[type],
                meta: { justifyContent, label: columnsMenuLabel || label, data, printable: true },
                size: width,
                minSize: minWidth,
                maxSize: maxWidth,
                enableResizing: resizable,
                enableSorting: sortable,
                enableMultiSort: sortable,
                enablePinning: pinnable,
                enableHiding: hideable,
                sortDescFirst: primarySortDirection === 'desc',
              } as const;

              // TODO columnHelper.display based on filterable / sortable https://tanstack.com/table/v8/docs/guide/column-defs
              return (
                ['image', 'componentChildren', 'template'].includes(type)
                  ? // TODO should be display and not accessor
                    // @ts-expect-error API error
                    columnHelper.accessor((row) => row.data[id], {
                      ...generalProps,
                      meta: { ...generalProps.meta, printable: 'graphical' },
                      enableSorting: false,
                      enableMultiSort: false,
                    })
                  : // @ts-expect-error API error
                    columnHelper.accessor((row) => row.data[id], generalProps)
              ) as ColumnDef<Row, unknown>;
            },
          ),
      [columnDefinitions, columnHelper],
    );

    const columnVisibility = useMemo<VisibilityState>(
      () =>
        columnDefinitions
          .filter(({ visible }) => visible === false)
          .reduce((acc, { id }) => ({ ...acc, [id]: false }), {}),
      [columnDefinitions],
    );

    const columnPinning = useMemo<ColumnPinningState>(() => {
      const left = pinnedColumns.left?.[0];
      const right = pinnedColumns.right?.[0];

      return { left: left ? [left] : [], right: right ? [right] : [] };
    }, [pinnedColumns]);

    const sorting = useMemo<SortingState>(
      () => sorts?.map(({ id, direction }) => ({ id, desc: direction === 'desc' })) || [],
      [sorts],
    );

    const tableState = useMemo<Pick<TableState, 'columnVisibility' | 'columnPinning' | 'sorting'>>(
      () => ({ columnVisibility, columnPinning, sorting }),
      [columnVisibility, columnPinning, sorting],
    );

    const onColumnSizeChange = useCallback<DataGridContext['onColumnSizeChange']>(
      (id, width) =>
        onColumnDefinitionsChange(
          columnDefinitions.map((column) => (column.id === id ? { ...column, width } : column)),
        ),
      [columnDefinitions, onColumnDefinitionsChange],
    );

    const onColumnVisibilityChange = useCallback<OnChangeFn<VisibilityState>>(
      (updater) => {
        const update: VisibilityState = typeof updater === 'function' ? updater(tableState.columnVisibility) : updater;
        const updatedColumns = columnDefinitions.map((column) => {
          const visibility = update[column.id];

          return visibility == null ? column : { ...column, visible: visibility };
        });
        onColumnDefinitionsChange(updatedColumns);
      },
      [tableState.columnVisibility, columnDefinitions, onColumnDefinitionsChange],
    );

    const onColumnPinningChange = useCallback<OnChangeFn<ColumnPinningState>>(
      (updater) => {
        const update: ColumnPinningState = typeof updater === 'function' ? updater(tableState.columnPinning) : updater;
        const left = getLastElement(update.left);
        const right = getLastElement(update.right);
        const sanitizedUpdate: Required<DataGridProps>['pinnedColumns'] = {};
        left && (sanitizedUpdate.left = [left]);
        right && (sanitizedUpdate.right = [right]);
        onPinnedColumnsChange?.(sanitizedUpdate);
      },
      [tableState.columnPinning, onPinnedColumnsChange],
    );

    // TODO allow undefined/missing getParams
    const backendRequest = useCallback(
      async <T,>(cb: ((params: T) => Promise<unknown>) | undefined, getParams: () => T) => {
        if (!cb) {
          return;
        }
        setIsRequesting(true);
        await cb(getParams());
        setIsRequesting(false);
      },
      [],
    );

    const onSortingChange = useCallback<OnChangeFn<SortingState>>(
      (updater) => {
        const update: SortingState = typeof updater === 'function' ? updater(tableState.sorting) : updater;
        backendRequest<Parameters<typeof onSortsChange>[0]>(onSortsChange, () =>
          update.map(({ id, desc }) => ({ id, direction: desc ? 'desc' : 'asc' })),
        );
      },
      [tableState.sorting, backendRequest, onSortsChange],
    );

    const table = useReactTable({
      data: rows,
      columns: modifiedColumns,
      state: tableState,
      columnResizeMode: 'onChange',
      getCoreRowModel: getCoreRowModel(),
      getSubRows: (row) => row.rows,
      getExpandedRowModel: getExpandedRowModel(),
      onColumnVisibilityChange,
      enableSorting: true,
      enableMultiSort: true,
      enablePinning: true,
      enableSortingRemoval: !disableUnsort,
      onColumnPinningChange,
      onSortingChange,
      getSortedRowModel: getSortedRowModel(),
      manualSorting: !clientSideSort,
    });

    const { rows: tableRows } = table.getRowModel();

    const virtualizer = useVirtualizer({
      count: onFetchRows ? tableRows.length + 1 : tableRows.length,
      // TODO If max/height is 100% (dynamic), fetch next scroll parent instead
      // If there is none, useWindowVirtualizer should be used if possible. if not see impl https://github.com/TanStack/virtual/blob/e2e94d1610075e661d75cdd421c244b76daafbfc/packages/react-virtual/src/index.tsx#L75
      getScrollElement: () => containerRef.current,
      estimateSize: () => 50,
      overscan: virtualizationOverscan,
    });

    const virtualRows = virtualizer.getVirtualItems();

    // To not handle every true/false/null case with defaults everywhere, build an object once
    const sanitizedToolbarConfig = useMemo(() => {
      if (toolbar == null || toolbar === true) {
        // Filter and Exports are not working correctly right now, hence disable them by default (except explicitly enabling them)
        return { columns: true, filter: false, density: true, exports: false };
      } else if (toolbar) {
        return {
          columns: !!toolbar.columns,
          filter: !!toolbar.filter,
          density: !!toolbar.density,
          exports: toolbar.export
            ? toolbar.export === true
              ? { csv: true, xlsx: true, pdf: true }
              : toolbar.export
            : false,
        };
      } else {
        return { columns: false, filter: false, density: false, exports: false };
      }
    }, [toolbar]);

    const dataGridContextValue = useMemo<DataGridContext>(
      () => ({
        table,
        tableRef,
        toolbarConfig: sanitizedToolbarConfig,
        density,
        onDensityChange,
        onColumnSizeChange,
      }),
      [table, sanitizedToolbarConfig, density, onDensityChange, onColumnSizeChange],
    );

    // Fetch new rows
    useEffect(() => {
      const lastItem = virtualRows.at(-1);
      if (!lastItem && rows.length !== 0) {
        return;
      }
      if (onFetchRows && !isRequesting && (!lastItem || lastItem.index >= tableRows.length)) {
        // TODO In hrAnalyticsPage a fetch is happening even if there are enough rows initially
        // eslint-disable-next-line unicorn/no-useless-undefined
        backendRequest(onFetchRows, () => undefined);
      }
    }, [backendRequest, isRequesting, onFetchRows, rows.length, tableRows.length, virtualRows]);

    // Using CSS grid with grid-template-columns prevents redrawing all cells when resizing a column
    const gridTemplateColumns = [
      ...table.getLeftVisibleLeafColumns(),
      ...table.getCenterVisibleLeafColumns(),
      ...table.getRightVisibleLeafColumns(),
    ]
      .map(({ getSize }) => `max(${2 * densities[density].cellPaddingX}px, ${getSize()}px)`)
      .join(' ');

    if (!columnDefinitions.length) {
      return null;
    }

    return (
      <DataGridContext.Provider value={dataGridContextValue}>
        <S.OuterWrapper fullHeight={fullHeight} data-section-hide-overflow>
          <S.Wrapper fullHeight={fullHeight} {...otherProps}>
            {isRequesting && loadingAnimation && <S.LoadingAnimation type="spinner" />}
            <S.Toolbar />
            <S.Scroller ref={containerRef}>
              <S.Table ref={tableRef}>
                <Head>
                  {table.getIsSomeColumnsVisible() ? (
                    table.getHeaderGroups().map((row) => (
                      <S.HeadRowWrapper key={row.id} density={density} gridTemplateColumns={gridTemplateColumns}>
                        <HeadRow row={row} />
                      </S.HeadRowWrapper>
                    ))
                  ) : (
                    <S.NoColumnsVisibleHeadRow $density={density} />
                  )}
                </Head>
                {!rows.length && !isRequesting && <S.NoDataMessage>{translate('no-data')}</S.NoDataMessage>}
                <S.Body $height={virtualizer.getTotalSize()}>
                  {virtualRows.map((virtualRow) => {
                    const rowData = tableRows[virtualRow.index];
                    if (!rowData) {
                      return null;
                    }
                    const hasOnClick = !!rowData.original?.onClick;

                    return (
                      <S.BodyRow
                        key={virtualRow.key}
                        ref={virtualizer.measureElement}
                        density={density}
                        data-index={virtualRow.index}
                        gridTemplateColumns={gridTemplateColumns}
                        transform={`translateY(${virtualRow.start}px)`}
                        hasOnClick={hasOnClick}
                        tabIndex={hasOnClick ? 0 : undefined}
                        onClick={hasOnClick ? rowData.original?.onClick : undefined}
                        onKeyDown={(event) => {
                          if ((event.key === 'Enter' || event.key === ' ') && !event.repeat && hasOnClick) {
                            event.preventDefault();
                            rowData.original?.onClick!();
                          }
                        }}
                      >
                        <BodyRow row={tableRows[virtualRow.index] as BodyRowProps['row']} />
                      </S.BodyRow>
                    );
                  })}
                </S.Body>
              </S.Table>
            </S.Scroller>
          </S.Wrapper>
        </S.OuterWrapper>
      </DataGridContext.Provider>
    );
  },
);
