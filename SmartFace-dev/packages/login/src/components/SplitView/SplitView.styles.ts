import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system/mediaQueries';

const SplitView = styled.div({
  display: 'flex',
  minHeight: '100vh',
  [mq.isSmallDevice]: {
    flexDirection: 'column',
  },
});

const LeftSide = styled.div({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  [mq.isSmallDevice]: {
    padding: '1rem',
  },
});

const ContentContainer = styled.div({
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

const Logo = styled.img({
  maxHeight: '24px',
  alignSelf: 'center',
  marginBottom: '1rem',
});

const RightSide = styled.div({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [mq.isSmallDevice]: {
    display: 'none',
  },
});

const Image = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const S = {
  SplitView,
  LeftSide,
  ContentContainer,
  Logo,
  RightSide,
  Image,
} as const;
