import type { ReactNode } from 'react';

export type RootLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};
