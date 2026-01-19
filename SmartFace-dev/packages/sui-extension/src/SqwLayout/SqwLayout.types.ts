import type { HTMLAttributes } from 'react';

import type { ContentProps, HeaderProps, SidebarProps } from './';

export type SqwLayoutProps = {
  content?: ContentProps;
  sidebar?: SidebarProps;
  header?: HeaderProps;
} & Omit<HTMLAttributes<HTMLDivElement>, 'content'>;
