import styled from '@emotion/styled';

import { densities } from '../../DataGrid.styles';
import type { DataGridContext } from '../../DataGridContext';

const NoColumnVisibleHeaderRow = styled.div<{
  density: DataGridContext['density'];
}>(({ density }) => ({
  padding: `${densities[density].cellPaddingY}px ${
    densities[density].cellPaddingX + densities[density].tablePaddingX
  }px`,
}));

export const S = {
  NoColumnVisibleHeaderRow,
} as const;
