import { observer } from 'mobx-react';

import Icon from '../../../../Icon';
import { S } from './SidebarToggle.styles';
import type { SidebarToggleProps } from './SidebarToggle.types';

export const SidebarToggle = observer((props: SidebarToggleProps) => (
  <S.SidebarToggle variant="subtle" {...props}>
    <Icon name="hamburger-menu-bars" />
  </S.SidebarToggle>
));
