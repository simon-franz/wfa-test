import { TextBalancer } from '@hrworks/sui-shared/components/TextBalancer';
import { PResizeObserver } from '@hrworks/sui-shared/polyfills/PResizeObserver';
import { observer } from 'mobx-react';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import type { VerticalSlideDirection } from '../../OnboardingController/OnboardingSidebar/OnboardingSidebar.types';
import type { ControlledVerticalNavigationProps } from '../VerticalNavigation.types';
import { VerticalNavigationContext } from '../VerticalNavigationContext';
import { S } from './DesktopVerticalNavigation.styles';

export const DesktopVerticalNavigation = observer(
  ({ items, activeItemId, setActiveItemId, ...otherProps }: ControlledVerticalNavigationProps) => {
    const { isActive } = useContext(VerticalNavigationContext);

    const [menuWidth, setMenuWidth] = useState<number | undefined>(0);
    const animationRef = useRef<VerticalSlideDirection>('slideDown');

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const resizeObserver = new PResizeObserver(() => {
        setMenuWidth(menuRef.current?.clientWidth);
      });
      if (menuRef.current) {
        resizeObserver.observe(menuRef.current);
      }

      return () => {
        resizeObserver?.disconnect();
      };
    }, []);

    const activeItemIndex = useMemo(() => items.findIndex((el) => el.id === activeItemId), [activeItemId, items]);

    const showMenu = useMemo(() => {
      const _activeItemIndex = items.findIndex((el) => el.id === (activeItemId || items[0].id));

      return Boolean(items[_activeItemIndex].navigationTitle);
    }, [activeItemId, items]);

    const handleArrowClick = useCallback(
      (forward: boolean) => {
        const newIndex = forward ? activeItemIndex + 1 : activeItemIndex - 1;
        if (items[newIndex]) {
          setActiveItemId(items[newIndex].id);
          animationRef.current = forward ? 'slideUp' : 'slideDown';
        }
      },
      [activeItemIndex, items, setActiveItemId],
    );

    const onClickNavItem = (id: string) => {
      window.scrollTo(0, 0);
      const clickedItemIndex = items.findIndex((el) => el.id === id);
      const animation = activeItemIndex < clickedItemIndex ? 'slideUp' : 'slideDown';
      animationRef.current = animation;
      setActiveItemId(id);
    };

    return (
      <S.Container menuHidden={!showMenu} {...otherProps}>
        <S.MenuWrapper menuHidden={!showMenu} ref={menuRef}>
          <S.Menu>
            {items.map(
              ({ navigationTitle, id, children, hasError }) =>
                navigationTitle &&
                children && (
                  <li key={id}>
                    <S.NavigationButton
                      data-isactive={activeItemId === id}
                      $hasError={hasError}
                      variant="unstyled"
                      onClick={(e) => {
                        onClickNavItem(id);
                        e.currentTarget.blur();
                      }}
                    >
                      <S.NavigationTitle>
                        <TextBalancer>{navigationTitle}</TextBalancer>
                      </S.NavigationTitle>
                    </S.NavigationButton>
                  </li>
                ),
            )}
          </S.Menu>
        </S.MenuWrapper>
        {items.map(
          ({
            id,
            children,
            onTopArrowClick: onTopArrowClickFromProps,
            onBottomArrowClick: onBottomArrowClickFromProps,
            hasError,
            ...otherProps
          }) => (
            <S.DesktopVerticalNavigationItem
              $menuWidth={menuWidth}
              onTopArrowClick={onTopArrowClickFromProps || (() => handleArrowClick(false))}
              onBottomArrowClick={onBottomArrowClickFromProps || (() => handleArrowClick(true))}
              animation={animationRef.current}
              isActive={isActive(id)}
              menuHidden={!showMenu}
              id={id}
              key={id}
              {...otherProps}
            >
              {children}
            </S.DesktopVerticalNavigationItem>
          ),
        )}
      </S.Container>
    );
  },
);
