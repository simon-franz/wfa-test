import { WARNING_CODES } from '@hrworks/error-handling';

import type { Dictionary } from '../LocalizationProvider.types';

export const getTranslationFunction =
  (dict: Dictionary) =>
  (key: keyof Dictionary): string => {
    const translation = dict[key];
    if (translation) {
      return translation;
    } else {
      console.log(WARNING_CODES.UNKNOWN_DICTIONARY_ENTRY, `Translation not found for key '${key}'`); // TODO: Fix Log

      return '### TRANSLATION NOT FOUND ###';
    }
  };
