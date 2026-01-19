import type { HTMLAttributes } from 'react';

export type InternalServerErrorProps = {
  title: string;
  message: string;
  close: () => void;
  url?: string;
  html?: boolean;
} & HTMLAttributes<HTMLDivElement>;
