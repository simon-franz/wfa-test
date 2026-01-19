import { isDev } from './functions/checkEnv';
import { generateLoremSentences, generateLoremWords } from './functions/stringGenerator';

// TODO check if it works
export const MISSING_STRING = isDev()
  ? '👉 👉  ⛔️ ☠️ ⛔️ M I S S I N G  |  R E Q U I R E D  |  S T R I N G ⛔️ ☠️ ⛔️  👈 👈'
  : 'N/A';
export const SHORT_STRING: string = generateLoremWords(4);
export const OVERFLOW_STRING: string = generateLoremSentences(6);
