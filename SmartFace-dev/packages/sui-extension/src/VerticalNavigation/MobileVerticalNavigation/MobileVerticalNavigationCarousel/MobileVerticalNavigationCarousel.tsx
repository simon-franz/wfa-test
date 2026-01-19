import { LocalizationContext } from '@hrworks/localization';
import FocusTrap from 'focus-trap-react';
import { observer } from 'mobx-react';
import { type UIEvent, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import type { SwipeEventData } from 'react-swipeable';

import { OnboardingControllerContext } from '../../../OnboardingController/OnboardingControllerContext';
import type { ControlledVerticalNavigationProps } from '../../VerticalNavigation.types';
import { S } from './MobileVerticalNavigationCarousel.styles';

export const MobileVerticalNavigationCarousel = observer(
  ({ items, children, activeItemId, setActiveItemId, ...otherProps }: ControlledVerticalNavigationProps) => {
    const onboardingControllerContext = useContext(OnboardingControllerContext);
    const { translate } = useContext(LocalizationContext);

    const scrollingElements = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const activeItemIndex = useMemo(() => {
      const index = items.findIndex((el) => el.id === activeItemId);

      return index === -1 ? 0 : index;
    }, [items, activeItemId]);

    useEffect(() => {
      activeItemId && scrollingElements.current[activeItemId]?.scroll({ top: 0 });
    }, [activeItemId]);

    const onSwipe = useCallback(
      (eventData: SwipeEventData) => {
        const swipeDirection = eventData.dir;
        let index = activeItemIndex;
        if (swipeDirection === 'Left') {
          index++;
        }
        if (swipeDirection === 'Right') {
          index--;
        }
        if (items[index] && (swipeDirection === 'Left' || swipeDirection === 'Right')) {
          setActiveItemId(items[index].id);
        }
      },
      [activeItemIndex, items, setActiveItemId],
    );

    const onClickNext = useCallback(
      (onBottomArrowClick?: () => void) => {
        if (onBottomArrowClick) {
          onBottomArrowClick();
        } else {
          const index = activeItemIndex + 1;
          if (items[index]) {
            setActiveItemId(items[index].id);
          }
        }
      },
      [activeItemIndex, setActiveItemId, items],
    );

    const handleScroll = useCallback(
      (e: UIEvent<HTMLDivElement>) => {
        if (Object.keys(onboardingControllerContext).length > 0) {
          const { scrollTop } = e.target as HTMLDivElement;
          if (scrollTop > 50) {
            !onboardingControllerContext.isScrolled && onboardingControllerContext.setIsScrolled(true);
          } else {
            onboardingControllerContext.isScrolled && onboardingControllerContext.setIsScrolled(false);
          }
        }
      },
      [onboardingControllerContext],
    );

    const clearFocus = () => (document.activeElement as HTMLElement | null)?.blur();

    return (
      <S.Swipeable delta={160} onSwiped={onSwipe} {...otherProps}>
        <S.Carousel activeItemIndex={activeItemIndex}>
          {items.map(
            ({
              id,
              children,
              navigationTitle,
              navigationIcon,
              description,
              onTopArrowClick,
              onBottomArrowClick,
              topArrowDescription,
              bottomArrowDescription,
              bottomArrowIcon,
              topArrowIcon,
              showBottomArrowBar,
              showTopArrowBar,
              hasError,
              ...otherProps
            }) => (
              <FocusTrap
                key={id}
                focusTrapOptions={{
                  allowOutsideClick: true,
                  initialFocus: false,
                  preventScroll: true,
                  onDeactivate: clearFocus,
                  onActivate: clearFocus,
                }}
                active={activeItemId === id}
              >
                <S.CarouselItem tabIndex={-1} {...otherProps}>
                  <S.ScrollWrapper>
                    <S.Scroller
                      $mobileHeaderHeight={onboardingControllerContext.mobileHeaderHeight}
                      id={id}
                      ref={(element) => {
                        scrollingElements.current[id] = element;
                      }}
                      onScroll={handleScroll}
                    >
                      {description && <S.ItemDescription>{description}</S.ItemDescription>}
                      {children}
                      <S.Button fullWidth onClick={() => onClickNext(onBottomArrowClick)}>
                        {bottomArrowDescription || translate('vertical-navigation-next')}
                      </S.Button>
                    </S.Scroller>
                  </S.ScrollWrapper>
                </S.CarouselItem>
              </FocusTrap>
            ),
          )}
        </S.Carousel>
      </S.Swipeable>
    );
  },
);
