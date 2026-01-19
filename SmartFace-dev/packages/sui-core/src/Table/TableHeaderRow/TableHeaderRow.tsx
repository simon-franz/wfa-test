import { observer } from 'mobx-react';

import { S } from './TableHeaderRow.style';
import type { TableHeaderRowProps } from './TableHeaderRow.types';

export const TableHeaderRow = observer((props: TableHeaderRowProps) => <S.TableHeaderRow {...props} />);
