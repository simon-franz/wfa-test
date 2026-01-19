import { Dropdown, DropdownArrow, DropdownContent } from '@hrworks/sui-shared/components/Dropdown';
import { observer } from 'mobx-react';

import { S } from './ProfileMenu.styles';
import type { ProfileMenuProps } from './ProfileMenu.types';
import { ProfileMenuBody } from './ProfileMenuBody';
import { ProfileMenuHeader } from './ProfileMenuHeader';

export const ProfileMenu = observer(
  ({
    trigger,
    portrait,
    title,
    subtitle,
    children,
    headerChildren,
    placement = 'bottom-end',
    ...otherProps
  }: ProfileMenuProps) => {
    return (
      <Dropdown placement={placement} {...otherProps}>
        <S.DropdownTrigger>{trigger}</S.DropdownTrigger>
        <DropdownContent>
          <DropdownArrow>
            <S.Arrow />
          </DropdownArrow>
          <S.Container>
            <ProfileMenuHeader portrait={portrait} title={title} subtitle={subtitle}>
              {headerChildren}
            </ProfileMenuHeader>
            {children && <ProfileMenuBody>{children}</ProfileMenuBody>}
          </S.Container>
        </DropdownContent>
      </Dropdown>
    );
  },
);
