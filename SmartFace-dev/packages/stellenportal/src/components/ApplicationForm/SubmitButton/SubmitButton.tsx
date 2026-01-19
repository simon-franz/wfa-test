'use client';

import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';

import { Button } from '../../Button';
import type { SubmitButtonProps } from './SubmitButton.types';

export const SubmitButton = (props: SubmitButtonProps) => {
  const t = useTranslations('FormFields');
  const { pending } = useFormStatus();

  // TODO: Translations and find out how this should behave and look like. The content shift is not optimal
  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? t('submit-button-pending') : t('submit-button')}
    </Button>
  );
};
