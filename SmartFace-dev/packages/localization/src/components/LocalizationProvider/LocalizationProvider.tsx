import { observer } from 'mobx-react';
import { useContext } from 'react';

import { getDayNames, getMonthNames, getShortDayNames, getShortMonthNames, getTranslationFunction } from './functions';
import de from './languages/de.json';
import en from './languages/en.json';
import { LocalizationContext } from './LocalizationContext';
import type { LocalizationProviderProps } from './LocalizationProvider.types';

/**
 * IMPORTANT: Do not remove the `observer` from the LocalizationProvider component.
 * Removal will prevent this component from reacting to changes in the backendConfig,
 * which is crucial for dynamic updates of translations.
 */
export const LocalizationProvider = observer(({ dictionary, locale, ...otherProps }: LocalizationProviderProps) => {
  const { dictionary: dictionaryFromContext, locale: localeFromContext } = useContext(LocalizationContext);
  const _locale = locale || localeFromContext || 'de';

  const locales = {
    en,
    de,
  };

  const baseDict = locales[_locale];

  const _dictionary = { ...baseDict, ...dictionaryFromContext, ...dictionary };

  const value: LocalizationContext = {
    dayNames: getDayNames(_dictionary),
    monthNames: getMonthNames(_dictionary),
    shortDayNames: getShortDayNames(_dictionary),
    shortMonthNames: getShortMonthNames(_dictionary),
    translate: getTranslationFunction(_dictionary),
    dictionary: _dictionary,
    locale: _locale,
  };

  // typescript-config/react.json uses @emotion/react as jsxImportSource, therefore
  // LocalizationContext relies on that dependency.
  // Make sure @emotion/react is installed to avoid TypeScript errors.
  return <LocalizationContext.Provider value={value} {...otherProps} />;
});
