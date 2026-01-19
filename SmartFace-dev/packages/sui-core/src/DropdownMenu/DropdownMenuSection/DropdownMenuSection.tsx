import { observer } from 'mobx-react';
import { useContext } from 'react';

import { DropdownMenuContext } from '../DropdownMenuContext';
import { DesktopDropdownMenuSection } from './DesktopDropdownMenuSection';
import type { DropdownMenuSectionProps } from './DropdownMenuSection.types';
import { MobileDropdownMenuSection } from './MobileDropdownMenuSection';

export const DropdownMenuSection = observer((props: DropdownMenuSectionProps) => {
  const { presentation } = useContext(DropdownMenuContext);

  return presentation === 'dropdown' ? (
    <DesktopDropdownMenuSection {...props} />
  ) : (
    <MobileDropdownMenuSection {...props} />
  );
});
