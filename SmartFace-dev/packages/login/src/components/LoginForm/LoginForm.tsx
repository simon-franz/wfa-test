'use client';

import Button from '@hrworks/sui-core/Button';
import { Checkbox } from '@hrworks/sui-core/Checkbox/Checkbox';
import Flexbox from '@hrworks/sui-core/Flexbox';
import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import PasswordField from '@hrworks/sui-core/PasswordField';
import TextField from '@hrworks/sui-core/TextField';
import Tooltip from '@hrworks/sui-core/Tooltip';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type ChangeEvent, useActionState, useCallback, useEffect, useState } from 'react';

import { authenticate } from '../../data-access/auth/authentication';
import {
  deleteCookie,
  getBooleanCookie,
  getCookie,
  setBooleanCookie,
  setCookie,
} from '../../utils/http/cookies/cookies-client';
import { CookieExpirations, CookieNames } from '../../utils/http/cookies/cookies-shared';
import { TextDivider } from '../TextDivider';
import { S } from './LoginForm.styles';
import type { CheckboxChangeHandler, LoginFormProps } from './LoginForm.types';

export const LoginForm = ({ ...otherProps }: LoginFormProps) => {
  const router = useRouter();
  const [formState, formAction] = useActionState(authenticate, null);
  const [showSSO, setShowSSO] = useState(false);
  const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const [userId, setUserId] = useState('');
  const t = useTranslations('LoginForm');

  const realm = process.env.NEXT_PUBLIC_REALM || '';

  // Initialize rememberMe state and credentials from cookies
  useEffect(() => {
    const cookieName = CookieNames.rememberMe(realm);
    const cookieValue = getBooleanCookie(cookieName);
    setRememberMeChecked(cookieValue);

    if (cookieValue) {
      const savedCompanyId = getCookie(CookieNames.savedCompanyId(realm));
      const savedUserId = getCookie(CookieNames.savedUserId(realm));
      setCompanyId(savedCompanyId || '');
      setUserId(savedUserId || '');
    }
  }, [realm]);

  const setRememberMeCookie = (value: boolean, realm: string) => {
    const cookieName = CookieNames.rememberMe(realm);
    setBooleanCookie(cookieName, value, {
      expires: CookieExpirations.sixMonths(),
    });
  };

  const setCredentialCookies = useCallback(
    (companyId: string, userId: string) => {
      if (companyId) {
        setCookie(CookieNames.savedCompanyId(realm), companyId, {
          expires: CookieExpirations.fiveHundredTwentyWeeks(),
        });
      }
      if (userId) {
        setCookie(CookieNames.savedUserId(realm), userId, {
          expires: CookieExpirations.fiveHundredTwentyWeeks(),
        });
      }
    },
    [realm],
  );

  const clearCredentialCookies = useCallback(() => {
    deleteCookie(CookieNames.savedCompanyId(realm));
    deleteCookie(CookieNames.savedUserId(realm));
  }, [realm]);

  const handleRememberMeChange: CheckboxChangeHandler = (event) => {
    const checked = event.target.checked;
    setRememberMeChecked(checked);
    setRememberMeCookie(checked, realm);

    if (checked) {
      setCredentialCookies(companyId, userId);
    } else {
      clearCredentialCookies();
    }
  };

  const handleSSOCheck = async (companyIdValue: string) => {
    setCompanyId(companyIdValue);
    if (companyId) {
      // TODO: Add ShowSSO Logic
      setShowSSO(true);
    }
  };

  useEffect(() => {
    if (formState) {
      const { success, redirectUrl, twoFactor } = formState;
      if (success && redirectUrl) {
        // SUCCESS
        // TODO: Implement correct routing
        router.push(redirectUrl);
      }

      // 2FA
      if (twoFactor) {
        const { selection, defaultMethod, methods } = twoFactor;
        const userEmail = methods?.email.email;
        if (selection) {
          // TODO: Use Methods in Selection page
          const searchParams = new URLSearchParams({
            companyId,
            userId,
            selection: `${selection}`,
            email: `${userEmail}`,
          });
          router.push(`/TwoFactorSelection?${searchParams.toString()}`);
        } else if (defaultMethod === 'email') {
          const searchParams = new URLSearchParams({
            companyId,
            userId,
          });
          router.push(`/TwoFactorEmail?${searchParams.toString()}`);
        }
      }
    }
  }, [companyId, formState, router, userId]);

  useEffect(() => {
    if (rememberMeChecked && (companyId || userId)) {
      setCredentialCookies(companyId, userId);
    }
  }, [rememberMeChecked, companyId, userId, setCredentialCookies]);

  return (
    <form action={formAction} {...otherProps}>
      <Grid gap={{ xs: 'large', lg: 'extraLarge' }}>
        <GridItem>
          <Grid>
            <GridItem>
              <TextField
                name="companyId"
                label={t('companyId')}
                value={companyId}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyId(e.target.value)}
                onValueChangeFinished={handleSSOCheck}
              />
            </GridItem>
            <GridItem>
              <TextField
                name="userId"
                label={t('userId')}
                value={userId}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)}
                onValueChangeFinished={(value: string) => setUserId(value)}
              />
            </GridItem>
            <GridItem>
              <PasswordField name="password" label={t('password')} />
            </GridItem>
            <GridItem>
              <Flexbox justifyContent="space-between" gap="small">
                <Tooltip text={t('tooltip')}>
                  <Checkbox
                    name="remember-me"
                    label={t('rememberMe')}
                    size="small"
                    checked={rememberMeChecked}
                    onChange={handleRememberMeChange}
                  />
                </Tooltip>
                <Button variant="link" size="extraSmall" onClick={() => router.push('/passwordReset')}>
                  {t('forgotCredentialsButton')}
                </Button>
              </Flexbox>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem>
          <Grid>
            <GridItem>
              <Button fullWidth textAlign="center" size="large" type="submit">
                {t('loginButton')}
              </Button>
            </GridItem>
            <GridItem>
              <S.AnimatedGrid isVisible={showSSO && !!companyId}>
                <GridItem>
                  <TextDivider>{t('orDividerText')}</TextDivider>
                </GridItem>
                <GridItem>
                  <Button fullWidth textAlign="center" variant="ghost" size="large">
                    {t('ssoLoginButton')}
                  </Button>
                </GridItem>
              </S.AnimatedGrid>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </form>
  );
};
