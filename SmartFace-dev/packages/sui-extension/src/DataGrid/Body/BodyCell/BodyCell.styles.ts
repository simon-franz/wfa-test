import styled from '@emotion/styled';
import type { ColumnPinningPosition } from '@tanstack/react-table';

import { densities } from '../../DataGrid.styles';
import type { ColumnDefinition } from '../../DataGrid.types';
import type { DataGridContext } from '../../DataGridContext';

const Cell = styled.div<{
  pinDirection?: ColumnPinningPosition;
}>(({ theme, pinDirection }) => ({
  whiteSpace: 'nowrap',
  backgroundColor: 'inherit',
  flex: '0 0 auto',
  ...(pinDirection && {
    position: 'sticky',
    zIndex: 1,
    '::after': {
      position: 'absolute',
      content: '""',
      top: 0,
      bottom: 0,
      width: 8,
      backgroundColor: 'transparent',
      ...(pinDirection === 'left' && {
        right: 0,
        boxShadow: `inset 8px 0 8px -8px ${theme.sqwTier2Color.surface.elevation.shadow}`,
        transform: 'translateX(100%)',
      }),
      ...(pinDirection === 'right' && {
        left: 0,
        boxShadow: `inset -8px 0 8px -8px  ${theme.sqwTier2Color.surface.elevation.shadow}`,
        transform: 'translateX(-100%)',
      }),
    },
    ...(pinDirection === 'left' && {
      left: 0,
    }),
    ...(pinDirection === 'right' && {
      right: 0,
    }),
  }),
}));

type ContentProps = {
  justifyContent: ColumnDefinition['justifyContent'];
  density: DataGridContext['density'];
};

const Content = styled.div<ContentProps>(({ justifyContent = 'left', density }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  justifyContent,
  padding: `${densities[density].cellPaddingY}px ${densities[density].cellPaddingX}px`,
}));

export const S = {
  Cell,
  Content,
} as const;
