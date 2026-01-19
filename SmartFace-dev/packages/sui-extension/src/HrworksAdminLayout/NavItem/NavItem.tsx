import { observer } from 'mobx-react';
import { useContext, useId } from 'react';

import { HrworksAdminLayoutContext } from '../HrworksAdminLayoutContext';
import { S } from './NavItem.styles';
import type { NavItemProps } from './NavItem.types';

export const NavItem = observer(({ id: _id, text, ...otherProps }: NavItemProps) => {
  const generatedId = useId();
  const id = _id || generatedId;
  const { activeNavigationItemId } = useContext(HrworksAdminLayoutContext);

  return (
    <S.NavigationButton
      id={id}
      key={id}
      size="medium"
      variant="unstyled"
      corner="rounded"
      $active={activeNavigationItemId === id}
      {...otherProps}
    >
      {text}
    </S.NavigationButton>
  );
});
