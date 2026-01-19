'use client';

import Button from '@hrworks/sui-core/Button';
import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useTransition } from 'react';

import { TwoFactorInput } from '../TwoFactorInput';
import type { TwoFactorFormProps } from './TwoFactorForm.types';

export const TwoFactorForm = ({ formAction, hiddenInputs, serverError, ...formProps }: TwoFactorFormProps) => {
  const [code, setCode] = useState('');
  const [hasError, setHasError] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('TwoFactor');

  useEffect(() => {
    setHasServerError(serverError || false);
  }, [serverError]);

  const showError = hasError || hasServerError;

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (hasError) {
      setHasError(false);
    }
    if (hasServerError) {
      setHasServerError(false);
    }
  };

  const handleCodeComplete = (completedCode: string) => {
    setCode(completedCode);
    // TODO: Talk to ui/ux if direct submit is wanted
    // if (onSubmit) {
    //   onSubmit(completedCode);
    // }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (code.length === 6) {
      const formData = new FormData();
      formData.append('code', code);
      if (hiddenInputs) {
        Object.entries(hiddenInputs).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }

      startTransition(() => {
        formAction(formData);
      });
    } else {
      setHasError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} {...formProps}>
      <Grid gap={{ xs: 'large', lg: 'extraLarge' }}>
        <GridItem>
          <TwoFactorInput
            onChange={handleCodeChange}
            onComplete={handleCodeComplete}
            autoFocus
            hasError={showError}
            errorMessage={t('codeInvalid')}
          />
        </GridItem>

        <GridItem>
          <Grid>
            <GridItem>
              <Button fullWidth type="submit" size="large" disabled={isPending}>
                {isPending ? t('verifyingButton') : t('verifyButton')}
              </Button>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </form>
  );
};
