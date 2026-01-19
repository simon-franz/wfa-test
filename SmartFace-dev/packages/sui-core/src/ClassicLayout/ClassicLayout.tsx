import { useMediaQuery } from '@hrworks/design-system';
import { observer } from 'mobx-react';
import { AnimatePresence } from 'motion/react';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { PageContext } from '../Page/PageContext';
import { Scroller } from '../Scroller';
import { S } from './ClassicLayout.styles';
import type { ClassicLayoutProps } from './ClassicLayout.types';
import { ClassicLayoutContext } from './ClassicLayoutContext';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import { Notifications } from './Notifications';
import Sidebars from './Sidebars';

export const ClassicLayout = observer(
  ({
    header,
    content,
    footer,
    sidebar,
    logo,
    desktopSidebarTogglerMode = 'none',
    ...otherProps
  }: ClassicLayoutProps) => {
    const { notifications } = useContext(PageContext);
    const [isMobileSidebarExpanded, setIsMobileSidebarExpanded] = useState(false);
    const [isDesktopSidebarExpanded, setIsDesktopSidebarExpanded] = useState(true);
    const hasSidebar = !!sidebar?.children;
    const hasHeader = !!hasSidebar || !!header || !!logo;
    const [isDesktopSidebarVisible, setIsDesktopSidebarVisible] = useState(hasSidebar && isDesktopSidebarExpanded);
    const isSmallDevice = useMediaQuery('isSmallDevice');

    const onToggleSidebar = useCallback(() => {
      isSmallDevice
        ? setIsMobileSidebarExpanded(!isMobileSidebarExpanded)
        : setIsDesktopSidebarExpanded(!isDesktopSidebarExpanded);
    }, [
      isSmallDevice,
      isMobileSidebarExpanded,
      setIsMobileSidebarExpanded,
      isDesktopSidebarExpanded,
      setIsDesktopSidebarExpanded,
    ]);

    const contextValue = useMemo<ClassicLayoutContext>(
      () => ({
        hasSidebar,
        isDesktopSidebarExpanded,
        isMobileSidebarExpanded,
        setIsMobileSidebarExpanded,
        isDesktopSidebarVisible,
        desktopSidebarTogglerMode,
        onToggleSidebar,
      }),
      [
        hasSidebar,
        isDesktopSidebarExpanded,
        isMobileSidebarExpanded,
        isDesktopSidebarVisible,
        desktopSidebarTogglerMode,
        onToggleSidebar,
      ],
    );

    useEffect(() => {
      setIsDesktopSidebarVisible(hasSidebar && isDesktopSidebarExpanded);
    }, [isDesktopSidebarExpanded, hasSidebar]);

    useEffect(() => {
      desktopSidebarTogglerMode === 'none' && setIsDesktopSidebarExpanded(true);
    }, [desktopSidebarTogglerMode, isDesktopSidebarExpanded]);

    return (
      <ClassicLayoutContext.Provider value={contextValue}>
        <Scroller>
          <S.LayoutContainer {...otherProps}>
            {hasHeader && <Header logo={logo} {...header} />}
            {hasSidebar && <Sidebars header={header} logo={logo} sidebar={sidebar} />}
            {hasSidebar && (
              <AnimatePresence>
                {!!isMobileSidebarExpanded && isSmallDevice && (
                  <S.Backdrop
                    onClick={(event) => {
                      event.stopPropagation();
                      setIsMobileSidebarExpanded(false);
                    }}
                  />
                )}
              </AnimatePresence>
            )}
            <Content {...content} />
            {footer?.children && <Footer {...footer} />}
            <Notifications notifications={notifications} />
          </S.LayoutContainer>
        </Scroller>
      </ClassicLayoutContext.Provider>
    );
  },
);
