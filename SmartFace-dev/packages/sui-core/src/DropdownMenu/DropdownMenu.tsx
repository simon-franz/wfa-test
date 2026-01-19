import { useTheme } from '@emotion/react';
import { autoUpdate, flip, limitShift, offset, shift, size, useFloating } from '@floating-ui/react-dom';
import { useMediaQuery } from '@hrworks/design-system';
import { mergeRefs } from '@hrworks/sui-shared';
import { KeyboardNavigableList } from '@hrworks/sui-shared/components/KeyboardNavigableList';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Portal from '../Portal';
import type { DropdownMenuProps } from './DropdownMenu.types';
import { DropdownMenuContext } from './DropdownMenuContext';
import { DropdownMenuTrigger } from './DropdownMenuTrigger/DropdownMenuTrigger';
import { DropdownMenuWrapper } from './DropdownMenuWrapper';
import MobileDropdownMenu from './MobileDropdownMenu';

export const DropdownMenu = observer(
  ({
    placement = 'bottom',
    trigger,
    items,
    title,
    presentation: presentationFromProps,
    ...otherProps
  }: DropdownMenuProps) => {
    const [expanded, setExpanded] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const portalTargetElement = useRef(document.createElement('div'));

    useEffect(() => {
      const localPortalTargetElement = portalTargetElement.current;
      document.body.append(localPortalTargetElement);

      return () => {
        localPortalTargetElement.remove();
      };
    }, []);

    const isPointerAndLargeDevice = useMediaQuery('isPointerAndLargeDevice');

    const presentation = presentationFromProps || (isPointerAndLargeDevice ? 'dropdown' : 'modal');

    const contextValue = useMemo<DropdownMenuContext>(
      () => ({
        toggleDropdown: () => setExpanded(!expanded),
        closeDropdown: () => setExpanded(false),
        expanded,
        presentation,
      }),
      [expanded, presentation],
    );

    const handleDocumentClickOrFocus = useCallback(
      (event: MouseEvent | FocusEvent) => {
        if (
          expanded &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as HTMLElement) &&
          !portalTargetElement.current.contains(event.target as HTMLElement)
        ) {
          setExpanded(false);
        }
      },
      [expanded],
    );

    useEffect(() => {
      document.addEventListener('click', handleDocumentClickOrFocus);
      document.addEventListener('focus', handleDocumentClickOrFocus, { capture: true });

      return () => {
        document.removeEventListener('click', handleDocumentClickOrFocus);
        document.removeEventListener('focus', handleDocumentClickOrFocus, { capture: true });
      };
    }, [handleDocumentClickOrFocus]);

    const { spacing, zIndex } = useTheme().marko.variables;

    const { refs, floatingStyles } = useFloating({
      middleware: [
        shift({ limiter: limitShift() }),
        flip(),
        offset({ mainAxis: spacing.distance.small }),
        size({
          apply({ availableWidth, elements }) {
            Object.assign(elements.floating.style, {
              maxWidth: `${availableWidth - spacing.distance.small}px`,
            });
          },
        }),
      ],
      placement,
      whileElementsMounted: autoUpdate,
    });

    return (
      <DropdownMenuContext.Provider value={contextValue}>
        {contextValue.presentation === 'dropdown' ? (
          <>
            <DropdownMenuTrigger ref={mergeRefs(refs.setReference, dropdownRef)} {...otherProps}>
              {typeof trigger === 'function' ? trigger({ open: expanded }) : trigger}
            </DropdownMenuTrigger>
            {expanded && (
              <Portal container={portalTargetElement.current}>
                <DropdownMenuWrapper ref={refs.setFloating} style={{ ...floatingStyles, zIndex: zIndex.popover }}>
                  <KeyboardNavigableList onBlur={() => setExpanded(false)}>{items}</KeyboardNavigableList>
                </DropdownMenuWrapper>
              </Portal>
            )}
          </>
        ) : (
          <MobileDropdownMenu title={title} trigger={trigger} items={items} {...otherProps} />
        )}
      </DropdownMenuContext.Provider>
    );
  },
);
