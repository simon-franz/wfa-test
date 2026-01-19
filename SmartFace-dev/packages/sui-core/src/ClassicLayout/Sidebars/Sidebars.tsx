import { observer } from 'mobx-react';
import { useCallback, useContext, useEffect } from 'react';

import { ClassicLayoutContext } from '../ClassicLayoutContext';
import Branding from '../Header/Branding';
import SidebarToggle from '../Header/Branding/SidebarToggle';
import { S } from './Sidebars.styles';
import type { SidebarsProps } from './Sidebars.types';

export const Sidebars = observer(({ logo, sidebar, ...otherProps }: SidebarsProps) => {
  const { isMobileSidebarExpanded, setIsMobileSidebarExpanded, isDesktopSidebarExpanded, onToggleSidebar } =
    useContext(ClassicLayoutContext);

  const onKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      isMobileSidebarExpanded && key === 'Escape' && setIsMobileSidebarExpanded(false);
    },
    [isMobileSidebarExpanded, setIsMobileSidebarExpanded],
  );
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <>
      <S.DesktopSidebar $isExpanded={isDesktopSidebarExpanded} {...sidebar} {...otherProps} />
      <S.MobileSidebar
        $isExpanded={isMobileSidebarExpanded}
        brandingElement={
          <Branding {...logo}>
            <SidebarToggle onClick={onToggleSidebar} />
          </Branding>
        }
        {...sidebar}
      />
    </>
  );
});
