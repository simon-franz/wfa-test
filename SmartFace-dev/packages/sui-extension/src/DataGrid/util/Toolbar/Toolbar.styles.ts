import styled from '@emotion/styled';

import { densities } from '../../DataGrid.styles';
import type { DataGridContext } from '../../DataGridContext';

const Toolbar = styled.div<{
  density: DataGridContext['density'];
}>(({ theme, density }) => ({
  display: 'flex',
  backgroundColor: theme.sqwTier2Color.background.neutral.subtle.default,
  padding: `${densities[density].cellPaddingY}px ${
    densities[density].cellPaddingX + densities[density].tablePaddingX - 10
  }px`,
}));

export const S = {
  Toolbar,
} as const;
