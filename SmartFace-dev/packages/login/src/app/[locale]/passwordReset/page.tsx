'use client';

import Button from '@hrworks/sui-core/Button';
import { Checkbox } from '@hrworks/sui-core/Checkbox/Checkbox';
import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import Text from '@hrworks/sui-core/Text';
import TextField from '@hrworks/sui-core/TextField';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { PageTitle } from '../../../components/PageTitle';
import { SplitView } from '../../../components/SplitView';

export default function PasswordResetPage() {
  const router = useRouter();
  const t = useTranslations('PasswordReset');

  const handlePasswordResetSubmit = () => {
    // TODO: Implement correct routing
  };

  const handleBackToLogin = () => {
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
                {t('description')}
              </Text>
            </GridItem>

            <GridItem>
              <TextField name="email" type="email" label="Email" required />
            </GridItem>

            <GridItem>
              <Checkbox name="human-verification" label={t('humanVerificationLabel')} />
            </GridItem>

            <GridItem>
              <Button fullWidth type="submit" size="large" onClick={handlePasswordResetSubmit}>
                {t('confirmButton')}
              </Button>
            </GridItem>

            <GridItem>
              <Button fullWidth variant="subtle" size="large" onClick={handleBackToLogin}>
                {t('backToLogin')}
              </Button>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </SplitView>
  );
}
