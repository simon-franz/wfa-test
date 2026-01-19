'use client';

import GridItem from '@hrworks/sui-core/GridItem';

import { S } from '../Layout.styles';
import type { LayoutMainProps } from './LayoutMain.types';

export const LayoutMain = ({ children, ...otherProps }: LayoutMainProps) => (
  <GridItem size={{ xl: 8, xs: 12 }} offset={{ xl: 2, xs: 0 }} {...otherProps}>
    <S.ColumnLayout>{children}</S.ColumnLayout>
  </GridItem>
);
