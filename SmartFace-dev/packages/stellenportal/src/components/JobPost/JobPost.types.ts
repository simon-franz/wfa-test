import type { components } from '@hrworks/api-schema';
import type { HTMLAttributes } from 'react';

import type { Post } from '../../types/post';

export type JobPostProps = {
  post: Post;
  postOffer: components['schemas']['PostOffer'];
  customerCompanyNumber: string;
} & HTMLAttributes<HTMLElement>;
