import { NavItem } from '@hrworks/sui-extension/HrworksAdminLayout';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { SmartFaceContext } from '../../../../../main/components/SmartFaceContext';
import type { NavItemBackendProps } from './NavItemAdapter.types';

export const NavItemAdapter = observer(({ onClick, sfId, ...otherProps }: NavItemBackendProps) => {
  const { applyEvents } = useContext(SmartFaceContext);

  const _onClick = onClick && (() => applyEvents(onClick));

  return <NavItem id={sfId} onClick={_onClick} {...otherProps} />;
});
