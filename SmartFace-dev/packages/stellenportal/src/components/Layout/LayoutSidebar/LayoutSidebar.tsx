'use client';

import GridItem from '@hrworks/sui-core/GridItem';

import { S } from '../Layout.styles';
import type { LayoutSidebarProps } from './LayoutSidebar.types';

export const LayoutSidebar = ({ children, ...otherProps }: LayoutSidebarProps) => (
  <GridItem size={{ xs: 12, xl: 2 }} {...otherProps}>
    <S.ColumnLayout>{children}</S.ColumnLayout>
  </GridItem>
);
