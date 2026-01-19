import { observer } from 'mobx-react';

import { S } from './OnboardingLoginPage.styles';
import type { OnboardingLoginPageProps } from './OnboardingLoginPage.types';

export const OnboardingLoginPage = observer(({ heading, children, ...otherProps }: OnboardingLoginPageProps) => (
  <S.Container {...otherProps}>
    <S.FormContainer>
      <S.Title headerTag="h1">{heading}</S.Title>
      {children}
    </S.FormContainer>
  </S.Container>
));
