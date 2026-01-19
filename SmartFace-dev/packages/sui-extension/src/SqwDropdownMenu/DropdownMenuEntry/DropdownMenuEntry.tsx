import { observer } from 'mobx-react';
import { useContext } from 'react';

import { SqwDropdownMenuContext } from '../SqwDropdownMenuContext';
import { DesktopDropdownMenuEntry, DropdownMenuCollapsibleMenuEntry, type DropdownMenuEntryProps } from './';

export const DropdownMenuEntry = observer((props: DropdownMenuEntryProps) => {
  const { presentation } = useContext(SqwDropdownMenuContext);

  if (presentation === 'dropdown') {
    return <DesktopDropdownMenuEntry {...props} />;
  }

  return <DropdownMenuCollapsibleMenuEntry {...props} />;
});
