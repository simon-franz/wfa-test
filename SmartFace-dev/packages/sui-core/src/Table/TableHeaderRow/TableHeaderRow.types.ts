import type { HTMLAttributes } from 'react';

import type { TableAlignment } from '../Table.types';

export type TableHeaderRowProps = TableAlignment & HTMLAttributes<HTMLTableRowElement>;
