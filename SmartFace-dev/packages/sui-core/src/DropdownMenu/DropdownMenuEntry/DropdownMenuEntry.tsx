import { observer } from 'mobx-react';
import { useContext } from 'react';

import { DropdownMenuContext } from '../DropdownMenuContext';
import { DesktopDropdownMenuEntry } from './DesktopDropdownMenuEntry';
import type { DropdownMenuEntryProps } from './DropdownMenuEntry.types';
import { MobileDropdownMenuEntry } from './MobileDropdownMenuEntry';

export const DropdownMenuEntry = observer((props: DropdownMenuEntryProps) => {
  const { presentation } = useContext(DropdownMenuContext);

  return presentation === 'dropdown' ? <DesktopDropdownMenuEntry {...props} /> : <MobileDropdownMenuEntry {...props} />;
});
