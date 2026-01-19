import type { HTMLAttributes } from 'react';

import type { TableAlignment } from '../Table.types';

export type TableHeaderProps = TableAlignment & HTMLAttributes<HTMLTableCellElement>;
