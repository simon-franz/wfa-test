import styled from '@emotion/styled';

import type { TableDataProps } from './TableData.types';

const TableData = styled.td<TableDataProps>(({ theme, onClick, horizontalAlignment, verticalAlignment }) => ({
  padding: theme.marko.variables.spacing.distance.small,
  backgroundColor: 'inherit',
  ...(onClick && {
    cursor: 'pointer',
  }),
  ':focus-visible': {
    outline: `2px solid ${theme.sqwTier2Color.border.focus}`,
    outlineOffset: -2,
  },
  [`&&&`]: {
    ...(horizontalAlignment && {
      textAlign: horizontalAlignment,
    }),
    ...(verticalAlignment && {
      verticalAlign: verticalAlignment,
    }),
  },
}));

export const S = {
  TableData,
} as const;
