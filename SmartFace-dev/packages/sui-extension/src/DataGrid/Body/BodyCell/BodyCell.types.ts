import type { Cell } from '@tanstack/react-table';
import type { HTMLAttributes } from 'react';

export type BodyCellProps = {
  cell: Cell<unknown, unknown>;
} & HTMLAttributes<HTMLDivElement>;
