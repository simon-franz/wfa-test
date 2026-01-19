'use client';

import Grid from '@hrworks/sui-core/Grid';

import { S } from './Layout.styles';
import type { LayoutProps } from './Layout.types';

export const Layout = ({ children, ...otherProps }: LayoutProps) => (
  <S.Container {...otherProps}>
    <Grid>{children}</Grid>
  </S.Container>
);
