import type { HTMLAttributes, ReactNode } from 'react';

export type VerticalNavigationItemProps = {
  id: string;
  hasError?: boolean;
  navigationTitle?: string;
  bottomArrowIcon?: ReactNode;
  onBottomArrowClick?: () => void;
  bottomArrowDescription?: string;
  showBottomArrowBar?: boolean;
  showTopArrowBar?: boolean;
  topArrowIcon?: ReactNode;
  onTopArrowClick?: () => void;
  navigationIcon?: ReactNode;
  topArrowDescription?: string;
  description?: string;
} & HTMLAttributes<HTMLDivElement>;

export type ControlledVerticalNavigationProps = {
  setActiveItemId: (activeItemId: ControlledVerticalNavigationProps['activeItemId']) => void;
  items: VerticalNavigationItemProps[];
  activeItemId?: string;
} & HTMLAttributes<HTMLDivElement>;

export type VerticalNavigationProps = Omit<ControlledVerticalNavigationProps, 'activeItemId' | 'setActiveItemId'>;
