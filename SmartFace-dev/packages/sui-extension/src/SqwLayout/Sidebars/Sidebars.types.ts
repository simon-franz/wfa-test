import type { HTMLAttributes } from 'react';

import type { HeaderProps } from '../Header/Header.types';
import type { SidebarProps } from '../Sidebar/Sidebar.types';

export type SidebarsProps = {
  header?: HeaderProps;
  sidebar?: SidebarProps;
} & HTMLAttributes<HTMLDivElement>;
