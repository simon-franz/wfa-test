import { observer } from 'mobx-react';
import { type MouseEvent, useCallback, useContext } from 'react';

import CollapsibleMenuEntry from '../../../CollapsibleMenu/Entry';
import { DropdownMenuContext } from '../../DropdownMenuContext';
import type { MobileDropdownMenuEntryProps } from './MobileDropdownMenuEntry.types';

export const MobileDropdownMenuEntry = observer(
  ({ children, href, onClick: onClickFromProps, submenu, ...otherProps }: MobileDropdownMenuEntryProps) => {
    const { closeDropdown } = useContext(DropdownMenuContext);

    const onClick =
      (!!href || onClickFromProps) &&
      useCallback(
        (event: MouseEvent<HTMLElement>) => {
          closeDropdown();
          onClickFromProps && onClickFromProps(event);
        },
        [closeDropdown, onClickFromProps],
      );

    return (
      <CollapsibleMenuEntry href={href} text={children as string} onClick={onClick} {...otherProps}>
        {submenu}
      </CollapsibleMenuEntry>
    );
  },
);
