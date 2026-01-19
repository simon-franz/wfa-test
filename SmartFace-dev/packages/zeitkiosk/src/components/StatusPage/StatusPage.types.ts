import type { HTMLAttributes } from 'react';

type RedirectButton = {
  title: string;
  href: string;
};

export type StatusPageProps = {
  title: string;
  subtitle: string;
  redirectButton?: RedirectButton;
} & HTMLAttributes<HTMLDivElement>;
