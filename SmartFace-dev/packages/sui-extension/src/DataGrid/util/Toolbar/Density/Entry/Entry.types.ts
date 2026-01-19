import type { HTMLAttributes } from 'react';

import type { DataGridProps } from '../../../../DataGrid.types';

export type EntryProps = {
  density: Exclude<DataGridProps['density'], undefined>;
} & HTMLAttributes<HTMLButtonElement>;
