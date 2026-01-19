'use client';

import Button from '@hrworks/sui-core/Button';

import { HTML } from '../Html';
import { Link } from '../Link';
import { S } from './StatusPage.styles';
import type { StatusPageProps } from './StatusPage.types';

// TODO: Consider Removing this component and using the one from smartface instead.
export const StatusPage = ({ title, subtitle, redirectButton, children, ...otherProps }: StatusPageProps) => (
  <S.Container {...otherProps}>
    <S.Content>
      {title && <S.Title>{title}</S.Title>}
      {subtitle && (
        <S.SubTitle>
          <HTML html={subtitle} />
        </S.SubTitle>
      )}
      {children}
      {redirectButton && (
        <S.ButtonWrapper>
          <Link href={redirectButton.href}>
            <Button>{redirectButton.title}</Button>
          </Link>
        </S.ButtonWrapper>
      )}
    </S.Content>
  </S.Container>
);
