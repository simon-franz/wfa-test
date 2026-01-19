import { observer } from 'mobx-react';
import { useContext } from 'react';

import { ClassicLayoutContext } from '../ClassicLayoutContext';
import { S } from './Header.styles';
import type { HeaderProps } from './Header.types';

export const Header = observer(({ children, logo, flexComponentChildren, ...otherProps }: HeaderProps) => {
  const { hasSidebar, desktopSidebarTogglerMode, onToggleSidebar } = useContext(ClassicLayoutContext);

  return (
    <S.Header {...otherProps}>
      <S.Branding {...logo}>
        {hasSidebar && (
          <S.SidebarToggle $desktopSidebarTogglerMode={desktopSidebarTogglerMode} onClick={onToggleSidebar} />
        )}
      </S.Branding>
      <S.HeaderContent>
        {flexComponentChildren && <S.FlexChildren>{flexComponentChildren}</S.FlexChildren>}
        {children && <S.RightItems>{children}</S.RightItems>}
      </S.HeaderContent>
    </S.Header>
  );
});
