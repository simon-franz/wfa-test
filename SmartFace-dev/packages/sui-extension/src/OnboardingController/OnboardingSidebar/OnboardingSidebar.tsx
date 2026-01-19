import { useContext } from 'react';

import { OnboardingControllerContext } from './../OnboardingControllerContext';
import { S } from './OnboardingSidebar.styles';
import type { OnboardingSidebarProps } from './OnboardingSidebar.types';

export const OnboardingSidebar = ({ animation, item, ...otherProps }: OnboardingSidebarProps) => {
  const { isActive } = useContext(OnboardingControllerContext);
  const { expandSidebar, id, title, description, media } = item;

  if (!isActive(id)) {
    return null;
  }

  return (
    <S.Container animation={animation} expandSidebar={expandSidebar} {...otherProps}>
      <S.Header expandSidebar={expandSidebar}>
        <S.Title uppercase expandSidebar={expandSidebar}>
          {title}
        </S.Title>
        <S.Description expandSidebar={expandSidebar}>{description}</S.Description>
      </S.Header>
      <S.ImageWrapper expandSidebar={expandSidebar}>{media}</S.ImageWrapper>
    </S.Container>
  );
};
