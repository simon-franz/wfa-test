import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';
import { Scroller } from '@hrworks/sui-core/Scroller';
import { Divider } from '@hrworks/sui-core/Section/Divider';

const componentConfig = {
  elementSpacing: '0.425rem',
};

const Layout = styled(Scroller)(({ theme }) => ({
  display: 'grid',
  height: '100%',
  gridTemplateRows: 'auto minmax(500px,1fr)',
  gridTemplateColumns: '100%',
  width: '100%',
  backgroundColor: theme.sqwTier2Color.surface.sunken,
  padding: '0 40px 10px 40px',
  [mq['<=sm']]: {
    padding: '0 20px 10px 20px',
  },
}));

const Header = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: componentConfig.elementSpacing,
  columnGap: 30,

  [mq['<=lg']]: {
    alignItems: 'flex-start',
  },
});

const LeftContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: `${componentConfig.elementSpacing} 0`,
  maxHeight: 70,
});

const LogoContainer = styled.a({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  minHeight: 42,
  width: '100%',
  minWidth: 140,
  maxWidth: 190,
});

const Logo = styled.img({
  height: '100%',
  width: '100%',
});

const NavigationWrapper = styled.div({
  [mq['<=lg']]: {
    order: 3,
    width: '100%',
  },
});

const NavigationContainer = styled(Scroller)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flex: 1,
  paddingLeft: 'min(7.4%, 35px)',
  columnGap: 30,
  [mq['>=lg']]: {
    overflow: 'visible',
  },
  [mq['<=lg']]: {
    width: '100%',
    flexWrap: 'wrap',
    rowGap: theme.marko.variables.spacing.distance.medium,
    columnGap: theme.marko.variables.spacing.distance.medium,
    paddingLeft: 0,
  },
}));

const RightContainer = styled(LeftContainer)({
  marginLeft: 'auto',
  [mq['<=lg']]: {
    order: 1,
  },
});

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.sqwTier2Color.border.bold,
  height: 2,
  width: '100%',
  border: 'none',
  margin: `${componentConfig.elementSpacing} 0`,
}));

const Container = styled.div({
  paddingTop: componentConfig.elementSpacing,
});

export const S = {
  Layout,
  Header,
  LeftContainer,
  LogoContainer,
  Logo,
  NavigationWrapper,
  NavigationContainer,
  RightContainer,
  StyledDivider,
  Container,
} as const;
