import { observer } from 'mobx-react';
import type { KeyboardEvent } from 'react';

import { S } from './TableData.styles';
import type { TableDataProps } from './TableData.types';

export const TableData = observer(({ onClick, ...otherProps }: TableDataProps) => {
  const onKeyDown = (event: KeyboardEvent<HTMLTableCellElement>) => {
    if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
      onClick!(event);
    }
  };

  return <S.TableData onClick={onClick} {...(onClick && { tabIndex: 0, onKeyDown: onKeyDown })} {...otherProps} />;
});
