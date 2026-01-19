import '@hrworks/design-system/styles/critical.css';

import type { Theme } from '@hrworks/design-system';
import SuiNextJsProvider from '@hrworks/sui-core/SuiNextJsProvider';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';

import RootLayout from '../../components/RootLayout';
import type { RootLayoutProps } from './layout.types';

export const metadata: Metadata = {
  title: 'NEXT HR WORKS - Zeitkiosk',
  description: 'NEXT HR WORKS Zeitkiosk',
};

const ZeitkioskRootLayout = async ({ children, params }: RootLayoutProps) => {
  const { locale } = await params;
  // TODO: Get this from API later on
  const theme: Theme = 'system';

  return (
    <html lang={locale} data-theme={theme}>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>
        <NextIntlClientProvider>
          <SuiNextJsProvider theme={theme}>
            <RootLayout>{children}</RootLayout>
          </SuiNextJsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default ZeitkioskRootLayout;
