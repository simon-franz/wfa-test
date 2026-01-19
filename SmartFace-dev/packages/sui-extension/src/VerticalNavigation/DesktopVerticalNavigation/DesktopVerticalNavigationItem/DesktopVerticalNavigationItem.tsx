import { usePrevious } from '@hrworks/sui-shared/hooks/usePrevious';
import { useContext, useEffect, useId, useRef } from 'react';

import { VerticalNavigationContext } from '../../VerticalNavigationContext';
import { S } from './DesktopVerticalNavigationItem.styles';
import type { DesktopVerticalNavigationItemProps } from './DesktopVerticalNavigationItem.types';

export const DesktopVerticalNavigationItem = ({
  id: _id,
  children,
  topArrowDescription,
  bottomArrowDescription,
  bottomArrowIcon,
  topArrowIcon,
  showBottomArrowBar = true,
  showTopArrowBar = true,
  onBottomArrowClick,
  onTopArrowClick,
  animation,
  menuHidden,
  description,
  isActive: isActiveFromProps,
  ...otherProps
}: DesktopVerticalNavigationItemProps) => {
  const { isActive } = useContext(VerticalNavigationContext);

  const generatedId = useId();
  const id = _id || generatedId;

  const scrollerRef = useRef<HTMLDivElement>(null);

  const prevIsActive = usePrevious(isActiveFromProps);

  useEffect(() => {
    if (prevIsActive !== isActiveFromProps) {
      scrollerRef.current?.scroll({ top: 0 });
    }
  });

  return (
    <S.Scroller $hide={!isActive(id)} scrollbarGutter="stable" ref={scrollerRef} {...otherProps}>
      <S.Wrapper>
        {showTopArrowBar && (
          <S.ArrowWrapper top={true}>
            <S.ArrowContainer top={true}>
              <S.ArrowButton $top={true} $filled={!!topArrowIcon} variant="unstyled" onClick={onTopArrowClick}>
                {topArrowIcon || <S.ArrowIcon name="vertical-navigation-arrow-up" />}
              </S.ArrowButton>
              <S.ArrowBackdropPointerEventsBlocker hasDescription={!!topArrowDescription} top={true} />
              {topArrowDescription && <>{topArrowDescription}</>}
            </S.ArrowContainer>
          </S.ArrowWrapper>
        )}
        <S.Content menuHidden={menuHidden} animation={animation}>
          {children}
        </S.Content>
        {showBottomArrowBar && (
          <S.ArrowWrapper>
            <S.ArrowContainer>
              {bottomArrowDescription && <>{bottomArrowDescription}</>}
              <S.ArrowButton $filled={!!bottomArrowIcon} variant="unstyled" onClick={onBottomArrowClick}>
                {bottomArrowIcon || <S.ArrowIcon name="vertical-navigation-arrow-down" />}
              </S.ArrowButton>
              <S.ArrowBackdropPointerEventsBlocker hasDescription={!!bottomArrowDescription} />
            </S.ArrowContainer>
          </S.ArrowWrapper>
        )}
      </S.Wrapper>
    </S.Scroller>
  );
};
