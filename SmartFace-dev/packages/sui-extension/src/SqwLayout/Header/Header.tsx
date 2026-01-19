import { observer } from 'mobx-react';

import { Branding } from '../Branding';
import { SidebarToggle } from '../SidebarToggle';
import { S } from './Header.styles';
import type { HeaderProps } from './Header.types';

export const Header = observer(({ logo, leftItems, rightItems, ...otherProps }: HeaderProps) => {
  return (
    <S.Header {...otherProps}>
      <Branding {...logo}>
        <SidebarToggle variant="subtle" />
      </Branding>
      <S.HeaderContent>
        <S.LeftContainer>{leftItems}</S.LeftContainer>
        <S.RightContainer>{rightItems}</S.RightContainer>
      </S.HeaderContent>
    </S.Header>
  );
});
