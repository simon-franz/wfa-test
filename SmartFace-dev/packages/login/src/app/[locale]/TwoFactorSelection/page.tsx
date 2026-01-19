'use client';

import Button from '@hrworks/sui-core/Button';
import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import Text from '@hrworks/sui-core/Text';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useActionState, useCallback, useEffect, useState } from 'react';

import { PageTitle } from '../../../components/PageTitle';
import { SplitView } from '../../../components/SplitView';
import { sendTwoFactor } from '../../../data-access/auth/sendTwoFactor';
import type { TwoFactorMethod, TwoFactorSelectionState } from './page.types';

export default function TwoFactorSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('TwoFactor');

  // TODO: Find out how to remove the fallbacks + is searchParams here bestPractice ?
  const selection = searchParams.get('selection') || 'fallback';
  const email = searchParams.get('email') || 'fallback';
  const companyId = searchParams.get('companyId') || 'fallback';
  const userId = searchParams.get('userId') || 'fallback';
  const authenticatorCreatedAt = searchParams.get('authenticatorCreatedAt') || 'fallback: 15.01.24 10:30';
  const authenticatorLastUsedAt = searchParams.get('authenticatorLastUsedAt') || 'fallback: 22.03.24 14:45';
  const yubiKeyCreatedAt = searchParams.get('yubiKeyCreatedAt') || 'fallback: 08.02.24 16:20';
  const yubiKeyLastUsedAt = searchParams.get('yubiKeyLastUsedAt') || 'fallback: 20.03.24 09:15';

  const [state, setState] = useState<TwoFactorSelectionState>({
    isLoading: false,
    error: null,
  });

  const [formState, formAction] = useActionState(sendTwoFactor, null);

  useEffect(() => {
    if (!email || !companyId || !userId) {
      setState((prev) => ({
        ...prev,
        error: 'Invalid access. Please login first.',
      }));
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [email, companyId, userId, router]);

  const handleMethodSelection = useCallback(
    (method: TwoFactorMethod) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      if (method !== 'email') {
        const params = new URLSearchParams({
          email,
          companyId,
          userId,
          selection,
        });

        // Map method names to actual folder names
        const folderMap = {
          email: 'TwoFactorEmail',
          authenticator: 'TwoFactorAuthenticator',
          yubiKey: 'TwoFactorYubiKey',
          selection: selection,
        } as const;

        router.push(`/${folderMap[method]}?${params.toString()}`);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
      // Email method is handled by the form action below
    },
    [email, companyId, userId, selection, router],
  );

  useEffect(() => {
    if (formState) {
      const { success, errorMessage } = formState;

      if (success) {
        console.log('2FA code sent successfully');

        const params = new URLSearchParams({
          email,
          companyId,
          userId,
        });

        router.push(`/TwoFactorEmail?${params.toString()}`);
      } else if (errorMessage) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
      }
    }
  }, [formState, email, companyId, userId, router]);

  const handleBackToLogin = useCallback(() => {
    router.push('/');
  }, [router]);

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
                {t('selectionDescription', { email })}
              </Text>
            </GridItem>
            {state.error && (
              <GridItem>
                <Text color="danger" textAlign="center">
                  {state.error}
                </Text>
              </GridItem>
            )}

            <GridItem>
              <Grid gap="medium">
                <GridItem>
                  <Grid gap="extraSmall">
                    <GridItem>
                      <form action={formAction}>
                        <input type="hidden" name="email" value={email} />
                        <input type="hidden" name="companyId" value={companyId} />
                        <input type="hidden" name="userId" value={userId} />
                        <input type="hidden" name="method" value="email" />
                        <Button variant="ghost" fullWidth size="large" type="submit" disabled={state.isLoading}>
                          {t('emailButton')}
                        </Button>
                      </form>
                    </GridItem>
                    <GridItem>
                      <Text fontSize="small" color="info">
                        {t('emailButtonHelptext', { email })}
                      </Text>
                    </GridItem>
                  </Grid>
                </GridItem>

                <GridItem>
                  <Grid gap="extraSmall">
                    <GridItem>
                      <Button
                        variant="ghost"
                        fullWidth
                        size="large"
                        onClick={() => handleMethodSelection('authenticator')}
                        disabled={state.isLoading}
                      >
                        {t('authenticatorButton')}
                      </Button>
                    </GridItem>
                    <GridItem>
                      <Text fontSize="small" color="info">
                        {t('authenticatorButtonHelptext', {
                          createdAt: authenticatorCreatedAt,
                          lastUsedAt: authenticatorLastUsedAt,
                        })}
                      </Text>
                    </GridItem>
                  </Grid>
                </GridItem>

                <GridItem>
                  <Grid gap="extraSmall">
                    <GridItem>
                      <Button
                        variant="ghost"
                        fullWidth
                        size="large"
                        onClick={() => handleMethodSelection('yubiKey')}
                        disabled={state.isLoading}
                      >
                        {t('yubiKeyButton')}
                      </Button>
                    </GridItem>
                    <GridItem>
                      <Text fontSize="small" color="info">
                        {t('yubiKeyButtonHelptext', {
                          createdAt: yubiKeyCreatedAt,
                          lastUsedAt: yubiKeyLastUsedAt,
                        })}
                      </Text>
                    </GridItem>
                  </Grid>
                </GridItem>
              </Grid>
            </GridItem>

            <GridItem>
              <Button fullWidth variant="subtle" size="large" onClick={handleBackToLogin} disabled={state.isLoading}>
                {t('backToLogin')}
              </Button>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </SplitView>
  );
}
