import type { HeaderGroup } from '@tanstack/react-table';
import type { HTMLAttributes } from 'react';

import type { Row } from '../../DataGrid.types';

export type HeadRowProps = {
  row: HeaderGroup<Row>;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;
