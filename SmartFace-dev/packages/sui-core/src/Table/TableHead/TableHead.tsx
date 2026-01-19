import { observer } from 'mobx-react';
import { useContext } from 'react';

import { TableContext } from '../TableContext';
import { S } from './TableHead.styles';
import type { TableHeadProps } from './TableHead.types';

export const TableHead = observer((props: TableHeadProps) => {
  const { stickyHead } = useContext(TableContext);

  return <S.TableHead stickyHead={stickyHead} {...props} />;
});
