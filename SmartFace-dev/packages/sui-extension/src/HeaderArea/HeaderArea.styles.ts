import styled from '@emotion/styled';

const HeaderArea = styled.div<{
  fullHeight?: boolean;
}>(({ fullHeight }) => ({
  ...(fullHeight && {
    height: '100%',
  }),
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gridTemplateColumns: '100%',
}));

const HeaderContainer = styled.div<{
  applyHeaderContainerGap: boolean;
}>(({ theme, applyHeaderContainerGap, children }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(150px, 1fr) auto',
  ...(applyHeaderContainerGap && {
    columnGap: theme.marko.variables.spacing.distance.medium,
  }),
  ...(children && {
    marginBottom: theme.marko.variables.spacing.distance.extraLarge,
  }),
}));

export const S = {
  HeaderArea,
  HeaderContainer,
} as const;
