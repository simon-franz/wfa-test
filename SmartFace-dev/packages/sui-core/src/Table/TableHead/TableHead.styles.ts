import styled from '@emotion/styled';

const TableHead = styled.thead<{
  stickyHead?: boolean;
}>(({ stickyHead }) => ({
  ...(stickyHead && {
    position: 'sticky',
    top: 0,
    zIndex: 1,
  }),
}));

export const S = {
  TableHead,
} as const;
