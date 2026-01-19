import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';
import _Title from '@hrworks/sui-core/Title';

const SplitView = styled.div({
  flex: 1,
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
});

const LeftSide = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.sqwTier2Color.surface.sunken,
  transition: 'width 0.3s ease-in-out',
  margin: 'auto',
  [mq.isPointerAndLargeDevice]: {
    width: '50%',
  },
}));

const ContentContainer = styled.form({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 444,
  padding: 20,
  gap: 60,
  [mq.isSmallDevice]: {
    gap: 30,
  },
});

const Logo = styled.img({
  width: 133,
});

const Title = styled(_Title)(({ theme }) => ({
  ...theme.sqwTier2Typography.title,
  color: theme.sqwTier2Color.text.subtle,
  [mq.isSmallDevice]: {
    ...theme.sqwTier2Typography.headingLg,
  },
}));

const RightSide = styled.div(({ theme }) => ({
  flex: 1,
  background: theme.sqwTier2Color.background.brand.bold.default,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 50,

  [mq.isTouchOrSmallDevice]: {
    display: 'none',
  },
}));

const RightTitle = styled.h1(({ theme }) => ({
  fontSize: 67,
  wordBreak: 'break-all',
  textAlign: 'center',
  rotate: '-6deg',
  maxWidth: 560,
  color: theme.sqwTier1.color.indigo[80],
}));

export const S = {
  SplitView,
  LeftSide,
  ContentContainer,
  Logo,
  Title,
  RightSide,
  RightTitle,
} as const;
