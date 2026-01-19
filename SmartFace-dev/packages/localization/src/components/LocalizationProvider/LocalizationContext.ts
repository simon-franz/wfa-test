import { createContext } from 'react';

import type {
  getDayNames,
  getMonthNames,
  getShortDayNames,
  getShortMonthNames,
  getTranslationFunction,
} from './functions';
import type { Dictionary, Locale } from './LocalizationProvider.types';

export type LocalizationContext = {
  shortMonthNames: ReturnType<typeof getShortMonthNames>;
  shortDayNames: ReturnType<typeof getShortDayNames>;
  dayNames: ReturnType<typeof getDayNames>;
  monthNames: ReturnType<typeof getMonthNames>;
  translate: ReturnType<typeof getTranslationFunction>;
  dictionary: Dictionary;
  locale: Locale;
};

export const LocalizationContext = createContext<LocalizationContext>({} as LocalizationContext);
