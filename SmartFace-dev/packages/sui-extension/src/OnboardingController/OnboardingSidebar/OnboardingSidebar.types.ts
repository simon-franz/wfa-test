import type { HTMLAttributes } from 'react';

import type { OnboardingControllerItemProps } from '../OnboardingController.types';

export type OnboardingSidebarProps = {
  item: OnboardingControllerItemProps;
  animation: VerticalSlideDirection;
} & HTMLAttributes<HTMLDivElement>;

export type VerticalSlideDirection = 'slideUp' | 'slideDown';
