import type { LogoProps } from '@hrworks/sui-core/Logo';
import type { HTMLAttributes, ReactNode } from 'react';

import type { VerticalNavigationItemProps } from '../VerticalNavigation';

export type OnboardingControllerProps = {
  items: OnboardingControllerItemProps[];
  setActiveItemId: (activeItemId: OnboardingControllerProps['activeItemId']) => void;
  imprintUrl?: string;
  activeItemId?: string;
  logo?: LogoProps;
} & HTMLAttributes<HTMLDivElement>;

export type OnboardingControllerItemProps = VerticalNavigationItemProps & {
  title?: string;
  media?: ReactNode;
  expandSidebar?: boolean;
} & HTMLAttributes<HTMLDivElement>;
