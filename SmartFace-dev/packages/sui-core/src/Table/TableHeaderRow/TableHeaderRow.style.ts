import styled from '@emotion/styled';

import type { TableHeaderRowProps } from './TableHeaderRow.types';

const TableHeaderRow = styled.tr<TableHeaderRowProps>(({ horizontalAlignment, verticalAlignment }) => ({
  [`&& td, && th`]: {
    ...(horizontalAlignment && { textAlign: horizontalAlignment }),
    ...(verticalAlignment && { verticalAlign: verticalAlignment }),
  },
}));

export const S = { TableHeaderRow } as const;
