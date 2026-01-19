'use client';
import Alert from '@hrworks/sui-core/Alert';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { RootLayoutClient } from '../../components/RootLayout/RootLayoutClient';
import { StatusPage } from '../../components/StatusPage';

// TODO: WIP only for Development. Don't show Error in Prod
export default function Error({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('Error');

  useEffect(() => {
    // captureException(error); // TODO: Evaluate if necessary
    console.error(error);
  }, [error]);

  return (
    <RootLayoutClient>
      <StatusPage title={t('title')} subtitle={t('message')}>
        <Alert color="danger">{error.message}</Alert>
      </StatusPage>
    </RootLayoutClient>
  );
}
