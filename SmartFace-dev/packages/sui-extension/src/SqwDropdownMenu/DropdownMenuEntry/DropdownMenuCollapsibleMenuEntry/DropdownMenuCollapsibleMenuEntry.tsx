import { CollapsibleMenuEntry } from '@hrworks/sui-core/CollapsibleMenu/Entry/CollapsibleMenuEntry';
import { observer } from 'mobx-react';
import { type MouseEvent, useCallback, useContext } from 'react';

import { SqwDropdownMenuContext } from '../../SqwDropdownMenuContext';
import type { DropdownMenuCollapsibleMenuEntryProps } from './DropdownMenuCollapsibleMenuEntry.types';

export const DropdownMenuCollapsibleMenuEntry = observer(
  ({ children, href, onClick, submenu, ...otherProps }: DropdownMenuCollapsibleMenuEntryProps) => {
    const { closeDropdown } = useContext(SqwDropdownMenuContext);

    const _onClick =
      (!!href || onClick) &&
      useCallback(
        (event: MouseEvent<HTMLElement>) => {
          closeDropdown();
          onClick && onClick(event);
        },
        [closeDropdown, onClick],
      );

    return (
      <CollapsibleMenuEntry href={href} text={children as string} onClick={_onClick} {...otherProps}>
        {submenu}
      </CollapsibleMenuEntry>
    );
  },
);
