import styled from '@emotion/styled';

const TabPanel = styled.div<{
  fullHeight?: boolean;
}>(({ fullHeight }) => ({
  ...(fullHeight && {
    height: '100%',
  }),
}));

export const S = {
  TabPanel,
} as const;
