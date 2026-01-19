import { getTranslations } from 'next-intl/server';

import { HeaderClient } from '../../components/Header';
import { StatusPage } from '../../components/StatusPage';

// TODO: Consider using Status from SUI
const NotFound = async () => {
  const t = await getTranslations('Error');

  return (
    <>
      <HeaderClient />
      <StatusPage title={t('title')} subtitle={t('message')} />
    </>
  );
};

export default NotFound;
