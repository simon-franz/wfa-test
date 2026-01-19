import { observer } from 'mobx-react';

import { S } from './TableHeader.styles';
import type { TableHeaderProps } from './TableHeader.types';

export const TableHeader = observer((props: TableHeaderProps) => <S.TableHeader scope="col" {...props} />);
