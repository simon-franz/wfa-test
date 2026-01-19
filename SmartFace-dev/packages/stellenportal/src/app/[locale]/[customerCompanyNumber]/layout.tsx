import '@hrworks/design-system/styles/critical.css';

import SuiNextJsProvider from '@hrworks/sui-core/SuiNextJsProvider';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import RootLayout from '../../../components/RootLayout';
import { getSettings } from '../../../data-access';
import { getCustomTheme } from '../../../data-access/getCustomTheme';

type LayoutProps = { children: ReactNode; params: Promise<{ locale: string; customerCompanyNumber: string }> };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; customerCompanyNumber: string }>;
}): Promise<Metadata> {
  const { customerCompanyNumber } = await params;
  try {
    const { tabTitle, faviconPicture } = await getSettings(customerCompanyNumber);

    return {
      title: tabTitle,
      icons: {
        icon: [
          {
            url:
              faviconPicture?.url ||
              'https://d3nnb1hxumbr0v.cloudfront.net/images/logos2024Relaunch/favicons/favicon-512.png',
            type: faviconPicture?.url ? 'image/png' : 'image/x-icon',
          },
        ],
        shortcut: faviconPicture?.url || '/favicon.ico',
        apple: faviconPicture?.url || '/apple-touch-icon.png',
      },
    };
  } catch (error) {
    console.error('Failed to load settings for favicon:', error);

    return {
      icons: {
        icon: '/favicon.ico',
      },
    };
  }
}

const Layout = async ({ children, params }: LayoutProps) => {
  const { customerCompanyNumber } = await params;
  const customTheme = await getCustomTheme(customerCompanyNumber);

  return (
    <SuiNextJsProvider customTheme={customTheme}>
      <RootLayout customerCompanyNumber={customerCompanyNumber}>{children}</RootLayout>
    </SuiNextJsProvider>
  );
};

export default Layout;
