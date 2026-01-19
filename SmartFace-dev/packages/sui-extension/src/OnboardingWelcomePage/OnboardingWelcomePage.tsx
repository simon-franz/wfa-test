import { observer } from 'mobx-react';

import { S } from './OnboardingWelcomePage.styles';
import type { OnboardingWelcomePageProps } from './OnboardingWelcomePage.types';

export const OnboardingWelcomePage = observer(
  ({ heading, footerChildren, children, ...otherProps }: OnboardingWelcomePageProps) => (
    <S.Container {...otherProps}>
      <S.Title headerTag="h1">{heading}</S.Title>
      <S.Body>{children}</S.Body>
      <S.Footer>{footerChildren}</S.Footer>
    </S.Container>
  ),
);
