import { useMediaQuery } from '@hrworks/design-system';
import { observer } from 'mobx-react';
import { useMemo } from 'react';

import {
  type ControlledVerticalNavigationProps,
  DesktopVerticalNavigation,
  MobileVerticalNavigation,
  VerticalNavigationContext,
} from './';

export const ControlledVerticalNavigation = observer(
  ({ activeItemId, setActiveItemId, ...otherProps }: ControlledVerticalNavigationProps) => {
    const isPointerAndLargeDevice = useMediaQuery('isPointerAndLargeDevice');

    const isActive = useMemo(() => (itemId: string) => activeItemId === itemId, [activeItemId]);

    const contextValue = useMemo(
      () => ({
        isActive,
        setActiveItemId,
      }),
      [isActive, setActiveItemId],
    );

    return (
      <>
        <VerticalNavigationContext.Provider value={contextValue}>
          {isPointerAndLargeDevice ? (
            <DesktopVerticalNavigation setActiveItemId={setActiveItemId} activeItemId={activeItemId} {...otherProps} />
          ) : (
            <MobileVerticalNavigation setActiveItemId={setActiveItemId} activeItemId={activeItemId} {...otherProps} />
          )}
        </VerticalNavigationContext.Provider>
      </>
    );
  },
);
