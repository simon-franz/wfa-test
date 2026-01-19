import type { Dictionary } from '../LocalizationProvider.types';

export const getShortDayNames = (dict: Dictionary) => [
  dict['day-sunday-short'],
  dict['day-monday-short'],
  dict['day-tuesday-short'],
  dict['day-wednesday-short'],
  dict['day-thursday-short'],
  dict['day-friday-short'],
  dict['day-saturday-short'],
];
