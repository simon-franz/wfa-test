import type { HTMLAttributes } from 'react';

import type { Settings } from '../../types/settings';

export type RootLayoutProps = {
  customerCompanyNumber?: string;
  hideFooter?: boolean;
  paddingTop?: number;
} & HTMLAttributes<HTMLDivElement>;

export type RootLayoutClientProps = {
  settings?: Settings;
} & Omit<RootLayoutProps, 'customerCompanyNumber'>;
