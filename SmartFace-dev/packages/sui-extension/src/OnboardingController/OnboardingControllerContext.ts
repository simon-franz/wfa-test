import { createContext } from 'react';

export type OnboardingControllerContext = {
  isActive: (itemId: string) => boolean;
  setIsScrolled: (isScrolled: boolean) => void;
  isScrolled: boolean;
  imprintUrl?: string;
  mobileHeaderHeight?: number;
};

export const OnboardingControllerContext = createContext<OnboardingControllerContext>(
  {} as OnboardingControllerContext,
);
