import styled from '@emotion/styled';

import { densities } from '../../DataGrid.styles';
import type { DataGridContext } from '../../DataGridContext';

const Image = styled.img<{
  density: DataGridContext['density'];
}>(({ theme, density }) => {
  const size = densities[density].rowMinHeight - 2 * densities[density].cellPaddingY;

  return {
    height: size,
    width: size,
    borderRadius: theme.marko.variables.borderRadius.small,
    objectFit: 'contain',
  };
});

export const S = {
  Image,
} as const;
