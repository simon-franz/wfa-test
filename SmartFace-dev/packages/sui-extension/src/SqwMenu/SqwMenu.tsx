import { MenuBody, MenuHeader, type SqwMenuProps } from '.';
import { Dropdown, DropdownArrow, DropdownContent } from '@hrworks/sui-shared/components/Dropdown';
import { observer } from 'mobx-react';

import { S } from './SqwMenu.styles';

export const SqwMenu = observer(
  ({
    children,
    placement = 'bottom-end',
    title,
    subtitle,
    portrait,
    onPortraitAction,
    icon,
    ...otherProps
  }: SqwMenuProps) => {
    const hasHeader = !!portrait || !!title || !!subtitle;

    return (
      <Dropdown placement={placement} {...otherProps}>
        <S.DropdownTrigger>{portrait || icon}</S.DropdownTrigger>
        <DropdownContent>
          <DropdownArrow>
            <S.Arrow header={hasHeader} />
          </DropdownArrow>
          <S.Container portrait={!!portrait}>
            {hasHeader && (
              <MenuHeader portrait={portrait} subtitle={subtitle} onPortraitAction={onPortraitAction} title={title} />
            )}
            {children && <MenuBody>{children}</MenuBody>}
          </S.Container>
        </DropdownContent>
      </Dropdown>
    );
  },
);
