import { LocalizationContext } from '@hrworks/localization';
import { useContext } from 'react';

import { DataGridContext } from '../../../../DataGridContext';
import { S } from './Entry.styles';
import type { EntryProps } from './Entry.types';

export const Entry = ({ density: _density, ...otherProps }: EntryProps) => {
  const { translate } = useContext(LocalizationContext);
  const { density, onDensityChange } = useContext(DataGridContext);

  return (
    <S.Entry isActive={density === _density} onClick={() => onDensityChange(_density)} {...otherProps}>
      {translate(`datagrid-density-${_density}`)}
    </S.Entry>
  );
};
