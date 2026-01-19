'use client';

import styled from '@emotion/styled';

const Container = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Content = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Title = styled.h1(({ theme }) => [
  {
    ...theme.sqwTier2Typography.title,
    padding: theme.marko.variables.spacing.distance.large,
    backgroundColor: theme.sqwTier2Color.surface.sunken,
    opacity: 0.8, // TODO: Make only background opaque
  },
]);

export const S = {
  Container,
  Content,
  Title,
} as const;
