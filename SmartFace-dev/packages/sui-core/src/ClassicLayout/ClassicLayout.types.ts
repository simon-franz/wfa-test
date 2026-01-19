import type { HTMLAttributes } from 'react';

import type { LogoProps } from '../Logo';
import type { ContentProps } from './Content/Content.types';
import type { FooterProps } from './Footer/Footer.types';
import type { HeaderProps } from './Header/Header.types';
import type { SidebarProps } from './Sidebars/Sidebar/Sidebar.types';

export type ClassicLayoutProps = {
  content?: ContentProps;
  footer?: FooterProps;
  header?: HeaderProps;
  sidebar?: SidebarProps;
  logo?: LogoProps;
  desktopSidebarTogglerMode?: 'none' | 'fully-collapse';
} & Omit<HTMLAttributes<HTMLDivElement>, 'content'>;
