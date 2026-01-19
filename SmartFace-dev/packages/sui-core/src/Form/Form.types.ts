import type { HTMLAttributes } from 'react';

export type FormProps = {
  id: string;
  fullHeight?: boolean;
} & HTMLAttributes<HTMLFormElement>;
