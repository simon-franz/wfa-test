import { observer } from 'mobx-react';
import { useContext } from 'react';

import CollapsibleMenu from '../../CollapsibleMenu';
import Modal from '../../Modal';
import { DropdownMenuContext } from '../DropdownMenuContext';
import DropdownMenuTrigger from '../DropdownMenuTrigger';
import type { MobileDropdownMenuProps } from './MobileDropdownMenu.types';

export const MobileDropdownMenu = observer(({ trigger, items, title, ...otherProps }: MobileDropdownMenuProps) => {
  const { expanded, closeDropdown } = useContext(DropdownMenuContext);

  return (
    <>
      <DropdownMenuTrigger>{typeof trigger === 'function' ? trigger({ open: expanded }) : trigger}</DropdownMenuTrigger>
      <Modal show={!!(expanded && items)} closeable size="small" title={title} onClose={closeDropdown}>
        <CollapsibleMenu {...otherProps}>{items}</CollapsibleMenu>
      </Modal>
    </>
  );
});
