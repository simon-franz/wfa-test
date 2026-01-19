'use client';

import LoadingAnimation from '@hrworks/sui-core/LoadingAnimation';

import { HeaderClient } from '../Header/HeaderClient';
import { S } from './Loading.styles';

export const Loading = () => (
  <S.Container>
    <HeaderClient loading />
    <LoadingAnimation type="spinner" />
  </S.Container>
);
