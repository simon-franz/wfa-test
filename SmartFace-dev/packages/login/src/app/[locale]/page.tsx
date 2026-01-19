'use client';

import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { LoginForm } from '../../components/LoginForm';
import { PageTitle } from '../../components/PageTitle';
import { SplitView } from '../../components/SplitView';
import { getBooleanCookie } from '../../utils/http/cookies/cookies-client';
import { CookieNames } from '../../utils/http/cookies/cookies-shared';

const LoginPage = () => {
  const t = useTranslations('LoginForm');
  const [rememberMe, setRememberMe] = useState(false);
  const realm = process.env.NEXT_PUBLIC_REALM || '';

  useEffect(() => {
    const cookieName = CookieNames.rememberMe(realm);
    const cookieValue = getBooleanCookie(cookieName);
    setRememberMe(cookieValue);
  }, [realm]);

  return (
    <SplitView>
      <Grid gap={{ xs: 'large', lg: 'extraLarge' }}>
        <GridItem>
          <PageTitle>{rememberMe ? t('welcomeBackTitle') : t('welcomeTitle')}</PageTitle>
        </GridItem>
        <GridItem>
          <LoginForm />
        </GridItem>
      </Grid>
    </SplitView>
  );
};

export default LoginPage;
