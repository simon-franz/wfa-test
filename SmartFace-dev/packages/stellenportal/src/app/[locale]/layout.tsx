import '@hrworks/design-system/styles/critical.css';

import type { Theme } from '@hrworks/design-system';
import SuiNextJsProvider from '@hrworks/sui-core/SuiNextJsProvider';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

type LayoutProps = { children: ReactNode; params: Promise<{ locale: string; customerCompanyNumber: string }> };

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Metadata');

  try {
    return {
      title: t('title'),
      icons: {
        icon: [
          {
            url: 'https://d3nnb1hxumbr0v.cloudfront.net/images/logos2024Relaunch/favicons/favicon-512.png',
            type: 'image/png',
          },
        ],
        shortcut: 'https://d3nnb1hxumbr0v.cloudfront.net/images/logos2024Relaunch/favicons/favicon-512.png',
        apple: 'https://d3nnb1hxumbr0v.cloudfront.net/images/logos2024Relaunch/favicons/favicon-512.png',
      },
    };
  } catch (error) {
    console.error('Failed to load settings for favicon:', error);

    return {
      icons: {
        icon: 'https://d3nnb1hxumbr0v.cloudfront.net/images/logos2024Relaunch/favicons/favicon-512.png',
      },
    };
  }
}

const Layout = async ({ children, params }: LayoutProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const theme: Theme = 'light';

  return (
    <html lang={locale} data-theme={theme}>
      <body>
        <NextIntlClientProvider>
          <SuiNextJsProvider theme={theme}>{children}</SuiNextJsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default Layout;
