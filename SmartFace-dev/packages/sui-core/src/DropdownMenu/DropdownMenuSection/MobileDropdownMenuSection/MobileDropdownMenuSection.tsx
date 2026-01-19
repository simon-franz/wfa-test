import { observer } from 'mobx-react';

import { S } from './MobileDropdownMenuSection.styles';
import type { MobileDropdownMenuSectionProps } from './MobileDropdownMenuSection.types';

export const MobileDropdownMenuSection = observer((props: MobileDropdownMenuSectionProps) => (
  <S.CollapsibleMenuSection {...props} />
));
