import type { HTMLAttributes } from 'react';

export type BreadcrumbsProps = {
  breadcrumbs?: Breadcrumb[];
} & HTMLAttributes<HTMLDivElement>;

export type Breadcrumb = {
  label: string;
  href?: string;
};
