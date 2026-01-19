import { useTheme } from '@emotion/react';
import { autoUpdate, flip, limitShift, offset, shift, size, useFloating } from '@floating-ui/react-dom';
import { KeyboardNavigableListItem } from '@hrworks/sui-shared/components/KeyboardNavigableList';
import { observer } from 'mobx-react';
import { type MouseEvent, useCallback, useContext } from 'react';

import Icon from '../../../Icon';
import { DropdownMenuContext } from '../../DropdownMenuContext';
import { DropdownMenuWrapper } from '../../DropdownMenuWrapper';
import { S } from './DesktopDropdownMenuEntry.styles';
import type { DesktopDropdownMenuEntryProps } from './DesktopDropdownMenuEntry.types';

export const DesktopDropdownMenuEntry = observer(
  ({
    children,
    href,
    onClick: onClickFromProps,
    target,
    icon,
    submenu,
    ...otherProps
  }: DesktopDropdownMenuEntryProps) => {
    const { closeDropdown } = useContext(DropdownMenuContext);

    const onClick = useCallback(
      (event: MouseEvent<HTMLElement>) => {
        if (onClickFromProps || href) {
          closeDropdown();
          onClickFromProps && onClickFromProps(event);
        }
      },
      [closeDropdown, href, onClickFromProps],
    );

    const { spacing, zIndex } = useTheme().marko.variables;

    const { refs, floatingStyles } = useFloating({
      middleware: [
        shift({ limiter: limitShift() }),
        flip(),
        offset({
          alignmentAxis: -spacing.distance.extraSmall,
          mainAxis: spacing.distance.small,
        }),
        size({
          apply({ availableWidth, elements }) {
            Object.assign(elements.floating.style, {
              maxWidth: `${availableWidth - spacing.distance.small}px`,
            });
          },
        }),
      ],
      placement: 'right-start',
      whileElementsMounted: autoUpdate,
    });

    return (
      <KeyboardNavigableListItem
        item={({ focus, sublistOpen }) => (
          <S.Entry
            ref={refs.setReference}
            focus={focus}
            sublistOpen={sublistOpen}
            onClick={submenu ? undefined : closeDropdown}
            submenu={!!submenu}
            {...otherProps}
          >
            <S.EntryButton
              onClick={onClick}
              href={href}
              $hasOnClick={!!onClickFromProps}
              target={target}
              leftIcon={icon}
              variant="unstyled"
            >
              {children}
            </S.EntryButton>
            {submenu && (
              <S.IconContainer>
                <Icon name="dropdown-indicator-right" />
              </S.IconContainer>
            )}
          </S.Entry>
        )}
        sublist={
          submenu
            ? () => (
                <DropdownMenuWrapper
                  ref={refs.setFloating}
                  style={{ ...floatingStyles, zIndex: zIndex.popover }}
                  submenu
                >
                  {submenu}
                </DropdownMenuWrapper>
              )
            : undefined
        }
      />
    );
  },
);
