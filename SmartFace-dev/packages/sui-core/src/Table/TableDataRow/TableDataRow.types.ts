import type { HTMLAttributes, KeyboardEvent, MouseEvent } from 'react';

import type { TableAlignment } from '../Table.types';

export type TableDataRowProps = TableAlignment & {
  onClick?: (event: KeyboardEvent<HTMLTableRowElement> | MouseEvent<HTMLTableRowElement>) => void;
} & Omit<HTMLAttributes<HTMLTableRowElement>, 'onClick'>;
