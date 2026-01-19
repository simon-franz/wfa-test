'use client';

import Button from '@hrworks/sui-core/Button';
import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import Text from '@hrworks/sui-core/Text';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';

import { PageTitle } from '../../../components/PageTitle';
import { SplitView } from '../../../components/SplitView';
import { TwoFactorForm } from '../../../components/TwoFactorForm';
import { verifyTwoFactor } from '../../../data-access/auth/verifyTwoFactor';

export default function TwoFactorPage() {
  const t = useTranslations('TwoFactor');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formState, formAction] = useActionState(verifyTwoFactor, null);

  const selection = searchParams.get('selection');
  const companyId = searchParams.get('companyId');
  const userId = searchParams.get('userId');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!companyId || !userId) {
      router.push('/');
    }
  }, [companyId, userId, router]);

  useEffect(() => {
    if (formState) {
      const { success } = formState;

      if (success) {
        router.push('/userPageDecoy');
      }
    }
  }, [formState, router, t]);

  const backToSelection = () => {
    if (!email || !companyId || !userId) {
      router.push('/');

      return;
    }
    const params = new URLSearchParams({ email, companyId, userId });
    router.push(`/TwoFactorSelection?${params.toString()}`);
  };

  const backToLogin = () => {
    router.push('/');
  };

  return (
    <SplitView>
      <Grid gap={{ xs: 'large', lg: 'extraLarge' }}>
        <GridItem>
          <PageTitle>{t('title')}</PageTitle>
        </GridItem>

        <GridItem>
          <Grid>
            <GridItem>
              <Text color="secondary" textAlign="center">
                {email && t('emailDescription', { email })}
              </Text>
            </GridItem>
            <GridItem>
              <TwoFactorForm
                formAction={formAction}
                hiddenInputs={{
                  companyId: companyId || '',
                  userId: userId || '',
                }}
                serverError={formState?.success === false}
              />
            </GridItem>
            {selection && (
              <GridItem>
                <Button fullWidth variant="subtle" textAlign="center" size="large" onClick={backToSelection}>
                  {t('backToSelection')}
                </Button>
              </GridItem>
            )}
            <GridItem>
              <Button fullWidth variant="subtle" textAlign="center" size="large" onClick={backToLogin}>
                {t('backToLogin')}
              </Button>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </SplitView>
  );
}
