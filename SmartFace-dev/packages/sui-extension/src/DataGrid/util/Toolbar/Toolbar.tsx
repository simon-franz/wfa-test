import { LocalizationContext } from '@hrworks/localization';
import Icon from '@hrworks/sui-core/Icon';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { DataGridContext } from '../../DataGridContext';
import { ColumnsMenu } from './Columns';
import { DensityMenu } from './Density';
import { ExportMenu } from './Export';
import { FilterMenu } from './Filter';
import { S } from './Toolbar.styles';
import type { ToolbarProps } from './Toolbar.types';
import { ToolbarButton } from './ToolbarButton';

export const Toolbar = observer((props: ToolbarProps) => {
  const { translate } = useContext(LocalizationContext);
  const { density: dataDensity } = useContext(DataGridContext);
  const { toolbarConfig } = useContext(DataGridContext);
  const { columns, filter, density, exports } = toolbarConfig;

  if (!columns && !filter && !density && !exports) {
    return null;
  }

  return (
    <S.Toolbar density={dataDensity} {...props}>
      {columns && (
        <ToolbarButton icon={<Icon name="data-grid-columns" />} menu={<ColumnsMenu />}>
          {translate('datagrid-toolbar-columns')}
        </ToolbarButton>
      )}
      {filter && (
        <ToolbarButton icon={<Icon name="data-grid-filter" />} menu={<FilterMenu />}>
          {translate('datagrid-toolbar-filter')}
        </ToolbarButton>
      )}
      {density && (
        <ToolbarButton icon={<Icon name="data-grid-density" />} menu={<DensityMenu />}>
          {translate('datagrid-toolbar-density')}
        </ToolbarButton>
      )}
      {exports && (
        <ToolbarButton icon={<Icon name="data-grid-export" />} menu={<ExportMenu />}>
          {translate('datagrid-toolbar-export')}
        </ToolbarButton>
      )}
    </S.Toolbar>
  );
});
