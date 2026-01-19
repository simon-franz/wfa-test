import type { ReactNode } from 'react';

import type en from './languages/en.json';

export type Dictionary = Record<keyof typeof en, string>;

export type Locale = 'de' | 'en';

export type LocalizationProviderProps = {
  children?: ReactNode;
  dictionary?: Dictionary | null;
  locale?: Locale | null;
};
