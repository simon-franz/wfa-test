import styled from '@emotion/styled';

import type { TableHeaderProps } from './TableHeader.types';

const TableHeader = styled.th<TableHeaderProps>(({ theme, horizontalAlignment, verticalAlignment }) => ({
  ...theme.sqwTier2Typography.labelMdSemibold,
  backgroundColor: theme.sqwTier2Color.background.neutral.subtle.default,
  padding: theme.marko.variables.spacing.distance.small,
  textAlign: 'inherit',
  '&&&': {
    ...(horizontalAlignment && {
      textAlign: horizontalAlignment,
    }),
    ...(verticalAlignment && {
      verticalAlign: verticalAlignment,
    }),
  },
}));

export const S = {
  TableHeader,
} as const;
