'use client';

import styled from '@emotion/styled';

import type { RootLayoutProps } from './RootLayout.types';

const Container = styled.div<Pick<RootLayoutProps, 'paddingTop'>>(({ theme, paddingTop = 65 }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
  backgroundColor: theme.stellenportal?.style?.backgroundColor || theme.sqwTier2Color.surface.sunken,
  color: theme.stellenportal?.fontStyle?.color,
  // TODO: Reference the required padding from the header
  paddingTop,
}));

const Content = styled.div({
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
});

export const S = {
  Container,
  Content,
} as const;
