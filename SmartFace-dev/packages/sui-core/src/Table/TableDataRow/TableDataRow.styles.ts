import styled from '@emotion/styled';
import { mq, withOpacity } from '@hrworks/design-system';

import type { TableProps } from '../Table.types';
import type { TableDataRowProps } from './TableDataRow.types';

type TableDataRow = TableDataRowProps & Pick<TableProps, 'alternatingColors' | 'hoverable'>;

const TableDataRow = styled.tr<TableDataRow>(
  ({ theme, onClick, alternatingColors, hoverable, horizontalAlignment, verticalAlignment }) => ({
    ...(alternatingColors && {
      ':nth-of-type(even)': {
        backgroundColor: withOpacity(theme.sqwTier2Color.background.neutral.subtle.default, '40%'),
      },
    }),
    ...(hoverable && {
      [mq.supportsHover]: {
        ':hover': {
          backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.hovered,
        },
      },
    }),
    ...(onClick && {
      cursor: 'pointer',
    }),
    ':focus-visible': {
      outline: `2px solid ${theme.sqwTier2Color.border.focus}`,
      outlineOffset: -2,
    },
    [`&& td, && th`]: {
      ...(horizontalAlignment && {
        textAlign: horizontalAlignment,
      }),
      ...(verticalAlignment && {
        verticalAlign: verticalAlignment,
      }),
    },
  }),
);

export const S = {
  TableDataRow,
} as const;
