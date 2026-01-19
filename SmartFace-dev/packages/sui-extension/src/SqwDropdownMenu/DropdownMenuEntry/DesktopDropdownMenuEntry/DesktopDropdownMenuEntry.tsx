import { useTheme } from '@emotion/react';
import Icon from '@hrworks/sui-core/Icon';
import { useFloat } from '@hrworks/sui-shared/components/Float/useFloat';
import { KeyboardNavigableListItem } from '@hrworks/sui-shared/components/KeyboardNavigableList';
import { observer } from 'mobx-react';
import { type MouseEvent, useCallback, useContext } from 'react';

import { DropdownMenuWrapper, SqwDropdownMenuContext } from '../../';
import { S } from './DesktopDropdownMenuEntry.styles';
import type { DesktopDropdownMenuEntryProps } from './DesktopDropdownMenuEntry.types';

export const DesktopDropdownMenuEntry = observer(
  ({
    children,
    href,
    onClick: onClickFromProps,
    badge,
    target,
    icon,
    submenu,
    ...otherProps
  }: DesktopDropdownMenuEntryProps) => {
    const { closeDropdown } = useContext(SqwDropdownMenuContext);

    const onClick = useCallback(
      (event: MouseEvent<HTMLElement>) => {
        if (onClickFromProps || href) {
          closeDropdown();
          onClickFromProps && onClickFromProps(event);
        }
      },
      [closeDropdown, href, onClickFromProps],
    );

    const { extraSmall, small } = useTheme().marko.variables.spacing.distance;

    const { refs, floatingStyles } = useFloat({
      placement: 'right-start',
      fallbackPlacements: ['left-start'],
      flip: true,
      shift: true,
      alignmentAxisOffset: -extraSmall,
      mainAxisOffset: small,
      show: true,
      scroll: false,
    });

    return (
      <KeyboardNavigableListItem
        item={(itemProps) => (
          <S.Entry
            ref={refs.setReference}
            onClick={submenu ? undefined : closeDropdown}
            submenu={!!submenu}
            {...itemProps}
            {...otherProps}
          >
            <S.EntryButton
              onClick={onClick}
              href={href}
              $hasOnClick={!!onClickFromProps}
              target={target}
              variant="unstyled"
            >
              <S.LeftContent>
                {icon}
                {children}
              </S.LeftContent>
              {badge}
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
                <div ref={refs.setFloating} style={floatingStyles}>
                  <DropdownMenuWrapper submenu>{submenu}</DropdownMenuWrapper>
                </div>
              )
            : undefined
        }
      />
    );
  },
);
