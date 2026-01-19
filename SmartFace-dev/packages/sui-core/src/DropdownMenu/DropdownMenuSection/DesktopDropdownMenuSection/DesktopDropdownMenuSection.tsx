import { observer } from 'mobx-react';

import { S } from './DesktopDropdownMenuSection.styles';
import type { DesktopDropdownMenuSectionProps } from './DesktopDropdownMenuSection.types';

export const DesktopDropdownMenuSection = observer(
  ({ title, children, ...otherProps }: DesktopDropdownMenuSectionProps) => (
    <>
      <S.Section {...otherProps}>{title}</S.Section>
      {children}
    </>
  ),
);
