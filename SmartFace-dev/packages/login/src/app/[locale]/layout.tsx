import '@hrworks/design-system/styles/critical.css';

import type { Theme } from '@hrworks/design-system/types';
import SuiNextJsProvider from '@hrworks/sui-core/SuiNextJsProvider';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';

import ErrorBoundary from '../../components/ErrorBoundary';
import type { LayoutProps } from './layout.types';

export const metadata: Metadata = {
  title: 'HR WORKS - Login',
  description: 'HR WORKS Login',
};

async function LoginRootLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  // TODO: Get this from API later on
  const theme: Theme = 'system';

  return (
    <html lang={locale} data-theme={theme}>
      <body>
        <ErrorBoundary>
          <NextIntlClientProvider locale={locale}>
            <SuiNextJsProvider theme={theme}>{children}</SuiNextJsProvider>
          </NextIntlClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

export default LoginRootLayout;
