import { observer } from 'mobx-react';
import { forwardRef } from 'react';

import { S } from './Table.styles';
import type { TableProps } from './Table.types';

export const Table = observer(
  forwardRef<HTMLDivElement, TableProps>(({ children, ...otherProps }, ref) => (
    <S.Table ref={ref} {...otherProps}>
      {children}
    </S.Table>
  )),
);
