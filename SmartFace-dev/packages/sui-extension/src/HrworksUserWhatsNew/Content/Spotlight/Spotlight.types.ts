import type { HTMLAttributes, ReactNode } from 'react';

import type { NewsItemProps } from '../PreviousNews/NewsItem';

export type SpotlightProps = {
  imgSrc?: string;
  statusBadge?: ReactNode;
} & Omit<NewsItemProps, 'title'> &
  HTMLAttributes<HTMLDivElement>;
