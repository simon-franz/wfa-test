import type { useTranslations } from 'next-intl';
import type { HTMLAttributes } from 'react';

import type { PostWithPostOffer } from '../../types/post';

export type FormFieldKeys = Parameters<ReturnType<typeof useTranslations<'FormFields'>>>[0];

export type TFormFieldFunction = ReturnType<typeof useTranslations<'FormFields'>>;

export type ApplicationFormProps = {
  postOfferId: string;
  post: PostWithPostOffer;
} & HTMLAttributes<HTMLDivElement>;

export type FormState = {
  message: string;
  success: boolean;
  errors: Record<string, string[]>;
};
