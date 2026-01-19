import { observer } from 'mobx-react';

import { S } from './DropdownMenuSection.styles';
import type { DropdownMenuSectionProps } from './DropdownMenuSection.types';

export const DropdownMenuSection = observer(({ children, ...otherProps }: DropdownMenuSectionProps) => (
  <>
    <S.Section {...otherProps} />
    {children}
  </>
));
