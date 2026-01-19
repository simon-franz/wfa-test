import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';
import _Title from '@hrworks/sui-core/Title';

const componentConfig = {
  default: '2.5rem',
  large: '3.2rem',
  extraLarge: '3.6rem',
};

const Container = styled.div({
  paddingBottom: 30,
});

const Title = styled(_Title)(({ theme }) => ({
  ...theme.sqwTier2Typography.title,
  wordSpacing: 9999,
  marginTop: 100,
  [mq.isTouchOrSmallDevice]: {
    margin: 0,
  },
  fontSize: componentConfig.default,
  lineHeight: componentConfig.default,
  [mq['>=lg']]: {
    fontSize: componentConfig.large,
    lineHeight: componentConfig.large,
  },
  [mq['>=xl']]: {
    fontSize: componentConfig.extraLarge,
    lineHeight: componentConfig.extraLarge,
  },
}));

const Body = styled.div({
  marginTop: 35,
});

const Footer = styled.div({
  marginTop: 50,
});

export const S = {
  Container,
  Title,
  Body,
  Footer,
} as const;
