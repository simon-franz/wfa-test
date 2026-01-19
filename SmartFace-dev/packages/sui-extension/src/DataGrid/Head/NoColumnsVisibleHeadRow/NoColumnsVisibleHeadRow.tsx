import { LocalizationContext } from '@hrworks/localization';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { DataGridContext } from '../../DataGridContext';
import { S } from './NoColumnsVisibleHeadRow.styles';
import type { NoColumnsVisibleHeadRowProps } from './NoColumnsVisibleHeadRow.types';

// Rendered to inform that no columns are visible and through the Columns Button there are more options to select.
export const NoColumnsVisibleHeadRow = observer((props: NoColumnsVisibleHeadRowProps) => {
  const { density } = useContext(DataGridContext);
  const { translate } = useContext(LocalizationContext);

  return (
    <S.NoColumnVisibleHeaderRow density={density} {...props}>
      {translate('datagrid-no-columns-visible-text')}
    </S.NoColumnVisibleHeaderRow>
  );
});
