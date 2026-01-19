import type { HTMLAttributes, ReactNode } from 'react';

export type OnboardingWelcomePageProps = {
  heading?: string;
  footerChildren?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
