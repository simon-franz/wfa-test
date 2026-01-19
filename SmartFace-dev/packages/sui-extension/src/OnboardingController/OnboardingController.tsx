import { LocalizationContext } from '@hrworks/localization';
import { getResizeObserverEntryHeight } from '@hrworks/sui-shared/functions/getResizeObserverEntryHeight';
import { PResizeObserver } from '@hrworks/sui-shared/polyfills/PResizeObserver';
import { observer } from 'mobx-react';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import SplitLayout from '../SplitLayout';
import { ControlledVerticalNavigation } from '../VerticalNavigation';
import {
  OnboardingControllerContext,
  type OnboardingControllerProps,
  OnboardingSidebar,
  type VerticalSlideDirection,
} from './';
import { S } from './OnboardingController.styles';

export const OnboardingController = observer(
  ({
    logo,
    items,
    activeItemId,
    setActiveItemId: setActiveItemIdFromProps,
    imprintUrl,
    ...otherProps
  }: OnboardingControllerProps) => {
    const { translate } = useContext(LocalizationContext);

    const animationRef = useRef<VerticalSlideDirection>('slideUp');
    const [mobileHeaderHeight, setMobileHeaderHeight] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    const activeItemIndex = useMemo(() => items.findIndex((el) => el.id === activeItemId), [activeItemId, items]);
    const activeTitle = useMemo(() => items[activeItemIndex].title, [activeItemIndex, items]);
    const headerRef = useRef<HTMLDivElement>(null);
    const resizeObserver = useRef<ResizeObserver>(null);

    useEffect(() => {
      resizeObserver.current = new PResizeObserver((entries) => {
        const entry = entries?.[0];
        if (!entry) return;
        const _mobileHeaderHeight = getResizeObserverEntryHeight(entry);
        if (mobileHeaderHeight !== _mobileHeaderHeight) {
          setMobileHeaderHeight(_mobileHeaderHeight);
        }
      });
      headerRef.current && resizeObserver.current.observe(headerRef.current);

      return () => {
        resizeObserver.current?.disconnect;
      };
    }, [mobileHeaderHeight]);

    const isActive = useCallback((itemId: string) => itemId != null && itemId === activeItemId, [activeItemId]);

    const setActiveItemId = useCallback(
      (newActiveItemId: OnboardingControllerProps['activeItemId']) => {
        const newIndex = items.findIndex((el) => el.id === newActiveItemId);
        if (newIndex !== activeItemIndex) {
          setIsScrolled(false);
          setActiveItemIdFromProps(newActiveItemId);
          animationRef.current = activeItemIndex < newIndex ? 'slideDown' : 'slideUp';
        }
      },
      [activeItemIndex, items, setActiveItemIdFromProps],
    );

    const sidebarChildren = useMemo(() => {
      return (
        (items[activeItemIndex]?.title || items[activeItemIndex]?.media) &&
        items?.map((item) => <OnboardingSidebar key={item.id} animation={animationRef.current} item={item} />)
      );
    }, [activeItemIndex, items]);

    const renderVerticalNavigation = useMemo(
      () => items && !items[activeItemIndex]?.expandSidebar && items.length > 1,
      [activeItemIndex, items],
    );

    const expandSidebar = items[activeItemIndex].expandSidebar;

    return (
      <OnboardingControllerContext.Provider
        value={{
          isActive,
          mobileHeaderHeight,
          setIsScrolled,
          isScrolled,
          imprintUrl,
        }}
      >
        <SplitLayout expandSidebar={expandSidebar} sidebarChildren={sidebarChildren} logo={logo} {...otherProps}>
          <S.MobileHeader expandSidebar={expandSidebar} ref={headerRef}>
            {logo?.src && (
              <S.MobileLogoWrapper
                titleExists={!!activeTitle}
                href={logo.href}
                target={logo.target}
                onClick={logo.onClick}
              >
                <S.MobileLogo alt={logo.alt} src={logo.src} />
              </S.MobileLogoWrapper>
            )}
            {activeTitle && (
              <S.SectionTitle headerTag="h1" uppercase>
                {activeTitle}
              </S.SectionTitle>
            )}
          </S.MobileHeader>
          {/* Assumption: When just 1 item exists user is on the LoginPage*/}
          {renderVerticalNavigation ? (
            <ControlledVerticalNavigation
              setActiveItemId={setActiveItemId}
              activeItemId={activeItemId}
              items={items.map(({ description, media, title, expandSidebar, ...otherProps }) => otherProps)}
            />
          ) : (
            <S.LoginPageWrapper>{items[activeItemIndex].children}</S.LoginPageWrapper>
          )}
          {imprintUrl && (
            <S.Imprint isScrolled={isScrolled} href={imprintUrl} target="_blank">
              {translate('onboarding-imprint')}
            </S.Imprint>
          )}
        </SplitLayout>
      </OnboardingControllerContext.Provider>
    );
  },
);
