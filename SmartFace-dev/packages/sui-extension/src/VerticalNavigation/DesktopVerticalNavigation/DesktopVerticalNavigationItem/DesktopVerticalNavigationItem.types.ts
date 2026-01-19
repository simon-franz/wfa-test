import type { VerticalNavigationItemProps } from '../../VerticalNavigation.types';

export type DesktopVerticalNavigationItemProps = {
  animation: 'slideUp' | 'slideDown';
  isActive: boolean;
  menuHidden: boolean;
} & VerticalNavigationItemProps;
