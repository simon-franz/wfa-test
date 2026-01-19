import type { HTMLAttributes, KeyboardEvent, MouseEvent } from 'react';

import type { TableAlignment } from '../Table.types';

export type TableDataProps = TableAlignment & {
  onClick?: (event: KeyboardEvent<HTMLTableCellElement> | MouseEvent<HTMLTableCellElement>) => void;
} & Omit<HTMLAttributes<HTMLTableCellElement>, 'onClick'>;
