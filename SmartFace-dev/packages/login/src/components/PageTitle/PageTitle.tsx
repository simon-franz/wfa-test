'use client';

import { S } from './PageTitle.styles';
import type { PageTitleProps } from './PageTitle.types';

export const PageTitle = ({ children, ...otherProps }: PageTitleProps) => (
  <S.Title alignTitle="center" {...otherProps}>
    {children}
  </S.Title>
);
