import type { HTMLAttributes } from 'react';

import type { PostWithPostOffer } from '../../types/post';
import type { Settings } from '../../types/settings';

export type HeaderProps = {
  customerCompanyNumber?: string;
  secondRow?: boolean;
  post?: PostWithPostOffer;
} & HTMLAttributes<HTMLDivElement>;

export type HeaderClientProps = {
  logoPicture?: Settings['logoPicture'];
  loading?: boolean;
} & Omit<HeaderProps, 'customerCompanyNumber'>;
