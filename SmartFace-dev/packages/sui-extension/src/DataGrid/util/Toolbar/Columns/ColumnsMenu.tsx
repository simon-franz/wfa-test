import { observer } from 'mobx-react';
import { useContext, useState } from 'react';

import type { ColumnDefinition } from '../../../DataGrid.types';
import { DataGridContext } from '../../../DataGridContext';
import { S } from './ColumnsMenu.styles';
import type { ColumnsMenuProps } from './ColumnsMenu.types';

export const ColumnsMenu = observer((props: ColumnsMenuProps) => {
  const { table } = useContext(DataGridContext);
  const [render, rerender] = useState(false);

  const createColumnTable = table
    ?.getAllLeafColumns()
    .map(({ id, getIsVisible, getToggleVisibilityHandler, getCanHide, columnDef }) => {
      const label = (columnDef.meta as ColumnDefinition | undefined)?.label || '';

      return (
        <S.Checkbox
          key={id}
          data-get-form-data-ignore
          id={`${id}-menu`}
          label={label}
          aria-label={label}
          name={columnDef.id!}
          disabled={!getCanHide()}
          type="checkbox"
          size="medium"
          checked={getIsVisible()}
          onChange={(e) => {
            getToggleVisibilityHandler()(e);
            rerender(!render);
          }}
        />
      );
    });

  return <S.Menu {...props}>{createColumnTable}</S.Menu>;
});
