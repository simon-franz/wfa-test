import type { Header } from '@tanstack/react-table';
import type { HTMLAttributes } from 'react';

import type { Row } from '../../DataGrid.types';

export type HeadCellProps = {
  header?: Header<Row, unknown>;
} & HTMLAttributes<HTMLDivElement>;
