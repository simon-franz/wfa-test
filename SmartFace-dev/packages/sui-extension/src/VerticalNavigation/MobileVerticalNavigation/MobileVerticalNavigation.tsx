import { Scroller } from '@hrworks/sui-core/Scroller';
import { observer } from 'mobx-react';
import { useCallback, useId, useMemo } from 'react';

import { type ControlledVerticalNavigationProps, MobileVerticalNavigationCarousel } from '../';
import { S } from './MobileVerticalNavigation.styles';

export const MobileVerticalNavigation = observer(
  ({ items, activeItemId, setActiveItemId, ...otherProps }: ControlledVerticalNavigationProps) => {
    const indicatorId = useId();

    const activeItemIndex = useMemo(() => {
      const index = items.findIndex((el) => el.id === activeItemId);

      return index === -1 ? 0 : index;
    }, [activeItemId, items]);

    const updateActiveItemId = useCallback<ControlledVerticalNavigationProps['setActiveItemId']>(
      (id) => {
        setActiveItemId(id);
      },
      [setActiveItemId],
    );

    return (
      <S.Container {...otherProps}>
        <MobileVerticalNavigationCarousel
          items={items}
          activeItemId={activeItemId}
          setActiveItemId={updateActiveItemId}
        />
        {items[activeItemIndex].navigationIcon && (
          <S.MenuWrapper>
            <Scroller>
              <S.Menu>
                {items.map(
                  ({ navigationIcon, id, hasError }) =>
                    navigationIcon && (
                      <li key={id} data-item-id={id}>
                        <S.NavigationButton variant="unstyled" onClick={() => updateActiveItemId(id)}>
                          <S.NavigationIcon hasError={hasError} isActive={activeItemId === id}>
                            {navigationIcon}
                          </S.NavigationIcon>
                        </S.NavigationButton>
                        {activeItemId === id && (
                          <S.IndicatorWrapper layoutId={indicatorId}>
                            <S.IndicatorDot hasError={hasError} />
                          </S.IndicatorWrapper>
                        )}
                      </li>
                    ),
                )}
              </S.Menu>
            </Scroller>
          </S.MenuWrapper>
        )}
      </S.Container>
    );
  },
);
