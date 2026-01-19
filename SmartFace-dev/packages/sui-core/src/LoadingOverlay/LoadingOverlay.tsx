import { ConditionalWrapper } from '@hrworks/sui-shared/components/ConditionalWrapper';
import { observer } from 'mobx-react';

import { S } from './LoadingOverlay.styles';
import type { LoadingOverlayProps } from './LoadingOverlay.types';

const isInertAvailable = 'inert' in document.createElement('div');

export const LoadingOverlay = observer(
  ({
    children,
    loading,
    type = 'spinner',
    blurIntensity = 'medium',
    fadeIntensity = 'medium',
    ...otherProps
  }: LoadingOverlayProps) => (
    <ConditionalWrapper
      condition={loading}
      wrapper={(children) => (
        <S.Container inert role="status" aria-busy="true" aria-live="polite" {...otherProps}>
          <S.LoadingAnimation type={type} />
          <S.ChildrenContainer blurIntensity={blurIntensity}>
            <S.FadingColor fadeIntensity={fadeIntensity} />
            {isInertAvailable && children}
          </S.ChildrenContainer>
        </S.Container>
      )}
    >
      {children}
    </ConditionalWrapper>
  ),
);
