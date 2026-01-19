import DataGrid from '@hrworks/sui-extension/DataGrid';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import { observer } from 'mobx-react';
import { type KeyboardEvent, type MouseEvent, useContext } from 'react';

import { ComponentMapper, mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { SfAxiosResponse } from '../../../main/lib/sfAxios';
import type { Update } from '../../../types/shared/BackendResponseType/UpdateTypes';
import type { SfEventType } from '../../../types/shared/SfEventTypes';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';
import type { DataGridAdapterProps, DataGridResponse, Row as BackendRow } from './DataGridAdapter.types';
import type { DataGridProps, Row as FrontendRow } from '@hrworks/sui-extension/DataGrid/DataGrid.types';

export const DataGridAdapter = observer(
  ({
    id,
    onFetchRows,
    columnDefinitions = [],
    rows = [],
    pinnedColumns = {},
    sorts = [],
    onPinnedColumnsChange,
    onSortsChange,
    onDensityChange,
    onColumnDefinitionsChange,
    ...otherProps
  }: DataGridAdapterProps) => {
    const { applyEvents, applyUpdates, queueBackendPatches } = useContext(SmartFaceContext);
    const { defaultFullHeight } = useContext(DefaultValueContext);

    const request = async (event: SfEventType) => {
      const response: SfAxiosResponse<DataGridResponse> | null = (await applyEvents(
        event,
      )) as null | SfAxiosResponse<DataGridResponse>;
      if (!response || response.type !== 'success') {
        return;
      }
      const newRows = response.data?.data?.rows;
      if (!newRows) {
        return;
      }
      applyUpdates([
        {
          operation: 'append',
          targetSfId: id,
          path: 'props.rows',
          value: newRows,
        },
      ]);
    };

    const onPropertyChange = async (propertyName: string, value: unknown, event?: SfEventType) => {
      const updates: Update[] = [
        {
          targetSfId: id,
          operation: 'write',
          path: `props.${propertyName}`,
          value,
        },
      ];
      applyUpdates(updates);
      queueBackendPatches(`${id}-${propertyName}`, updates);
      event && (await request(event));
    };

    const _columnDefinitions: DataGridProps['columnDefinitions'] = columnDefinitions.map(({ data, ...otherProps }) => ({
      ...otherProps,
      ...(otherProps.type === 'componentChildren'
        ? {
            data: (props) => mapSmartFaceComponentsToAdapters(Array.isArray(props) ? props : []),
          }
        : otherProps.type === 'template' && {
            data: (props) =>
              isObject(data) ? (
                <ComponentMapper
                  smartFaceComponent={
                    {
                      ...data,
                      props: merge({}, (data as SmartFaceComponentsType).props, props),
                    } as SmartFaceComponentsType
                  }
                />
              ) : null,
          }),
    }));

    const _onPinnedColumnsChange: DataGridProps['onPinnedColumnsChange'] = (value) =>
      onPropertyChange('pinnedColumns', value, onPinnedColumnsChange);

    const _onDensityChange: DataGridProps['onDensityChange'] = (value) =>
      onPropertyChange('density', value, onDensityChange);

    const _onSortsChange: DataGridProps['onSortsChange'] = async (value) =>
      onPropertyChange('sorts', value, onSortsChange);

    const _onColumnDefinitionsChange: DataGridProps['onColumnDefinitionsChange'] = (value) =>
      onPropertyChange(
        'columnDefinitions',
        value.map((columnDefinition) =>
          columnDefinition.type === 'componentChildren' || columnDefinition.type === 'template'
            ? {
                ...columnDefinition,
                data: columnDefinitions?.find(({ id }) => id === columnDefinition.id)?.data,
              }
            : columnDefinition,
        ),
        onColumnDefinitionsChange,
      );

    const _onFetchRows = onFetchRows && (async () => request(onFetchRows));

    const mapRow = ({ id, data, onClick, rows: childRows }: BackendRow) => {
      const resultRow: FrontendRow = { id, data };

      if (onClick) {
        resultRow.onClick = (event?: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => {
          event?.preventDefault();
          event?.stopPropagation();
          applyEvents(onClick);
        };
      }

      if (childRows?.length) {
        resultRow.rows = childRows.map((childRow: BackendRow) => mapRow(childRow));
      }

      return resultRow;
    };

    const _rows = rows.map((row: BackendRow) => mapRow(row));

    return (
      <DataGrid
        id={id}
        pinnedColumns={pinnedColumns}
        sorts={sorts}
        rows={_rows}
        onFetchRows={_onFetchRows}
        columnDefinitions={_columnDefinitions}
        onColumnDefinitionsChange={_onColumnDefinitionsChange}
        onPinnedColumnsChange={_onPinnedColumnsChange}
        onDensityChange={_onDensityChange}
        onSortsChange={_onSortsChange}
        fullHeight={defaultFullHeight}
        {...otherProps}
      />
    );
  },
);
