import { observer } from 'mobx-react';

import { HeadCell } from '../HeadCell';
import { S } from './HeadRow.styles';
import type { HeadRowProps } from './HeadRow.types';

export const HeadRow = observer(({ row, ...otherProps }: HeadRowProps) => (
  <S.Row {...otherProps}>
    {row.headers.map((header) => (
      <HeadCell key={header.id} header={header} />
    ))}
  </S.Row>
));
