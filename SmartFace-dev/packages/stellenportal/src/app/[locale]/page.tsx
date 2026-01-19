import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Header } from '../../components/Header';
import RootLayout from '../../components/RootLayout';
import { StatusPage } from '../../components/StatusPage';

export async function generateStaticParams() {
  return ['en', 'de'].map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

const Home = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Testing');

  return (
    <RootLayout>
      <Header />
      <StatusPage
        title={t('noCustomerCompanyIdTitle')}
        subtitle={t('noCustomerCompanyIdSubtitle')}
        redirectButton={{ href: `/110192`, title: t('redirectButtonTitle') }}
      />
    </RootLayout>
  );
};

export default Home;
