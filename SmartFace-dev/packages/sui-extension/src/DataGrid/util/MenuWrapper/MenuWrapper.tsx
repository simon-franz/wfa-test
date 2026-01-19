import { useTheme } from '@emotion/react';
import { Float } from '@hrworks/sui-shared/components/Float';
import { observer } from 'mobx-react';
import { useEffect, useRef } from 'react';

import { S } from './MenuWrapper.styles';
import type { MenuWrapperProps } from './MenuWrapper.types';

export const MenuWrapper = observer(
  ({ children, closeMenu, menu, show, useAnchorRef, ...otherProps }: MenuWrapperProps) => {
    const buttonRef = useRef<HTMLElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const onClickOutside: EventListener = (event) => {
        if (
          !menuRef.current?.contains(event.target as HTMLElement) &&
          (!useAnchorRef || !buttonRef.current?.contains(event.target as HTMLElement))
        ) {
          closeMenu();
        }
      };
      const onEscapePress = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeMenu();
        }
      };
      document.addEventListener('mousedown', onClickOutside);
      document.addEventListener('keydown', onEscapePress);

      return () => {
        document.removeEventListener('mousedown', onClickOutside);
        document.removeEventListener('keydown', onEscapePress);
      };
    }, [closeMenu, useAnchorRef]);

    const currentTheme = useTheme();

    return (
      <Float
        show={show}
        flip
        shift
        placement="bottom-start"
        fallbackPlacements={['top-start']}
        zIndex={currentTheme.marko.variables.zIndex.popover}
      >
        {({ getFloatStyles, floatRef, anchorRef }) => (
          <>
            {children({
              anchorRef: (ref) => {
                buttonRef.current = ref;
                anchorRef(ref);
              },
            })}
            <S.Menu
              ref={(ref) => {
                menuRef.current = ref;
                floatRef(ref);
              }}
              style={getFloatStyles()}
              {...otherProps}
            >
              {menu}
            </S.Menu>
          </>
        )}
      </Float>
    );
  },
);
