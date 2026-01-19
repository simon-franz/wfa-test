import type { DateFormat, IsoDateRange } from '@hrworks/types/shared/UiTypes';
import { format } from 'date-fns/format';
import { formatISO } from 'date-fns/formatISO';
import { getMonth as _getMonth } from 'date-fns/getMonth';
import { getYear as _getYear } from 'date-fns/getYear';
import { isBefore } from 'date-fns/isBefore';
import { parseISO } from 'date-fns/parseISO';
import { startOfToday } from 'date-fns/startOfToday';

export function isValidDate(date: Date | null | undefined): date is Date {
  return date == null ? false : !Number.isNaN(date.getTime());
}

export function parseIsoDate(date: string): Date {
  return parseISO(date);
}

function normalizeMatch(match: RegExpMatchArray | null, date: string, length: number, padCharacter: string): string {
  if (match?.index == null) {
    return 'x';
  }
  const maskPart = match[0];
  const datePart = date.slice(match.index, match.index + maskPart.length);

  return datePart.padStart(length - maskPart.length, padCharacter);
}

export function parseMaskedDateToIsoDate(date: string, mask: string): string {
  const day = /[Dd]{1,2}/.exec(mask);
  const month = /[Mm]{1,2}/.exec(mask);
  const year = /[Yy]{1,4}/.exec(mask);
  if (day?.index == null || month?.index == null || year?.index == null || !date) {
    return '';
  }

  return `${normalizeMatch(year, date, 4, 'y')}-${normalizeMatch(month, date, 2, 'm')}-${normalizeMatch(
    day,
    date,
    2,
    'd',
  )}`;
}

export function parseMaskedDateRangeToIsoDateRange(dateRange: string, mask: string): IsoDateRange {
  const dates = dateRange.split(' - ');
  const from = parseMaskedDateToIsoDate(dates[0], mask);
  const to = parseMaskedDateToIsoDate(dates[1], mask);

  return { from, to };
}

export function parseIsoDateToMaskedDate(date: string, mask: string): string {
  const [year, month, day] = date.split('-');

  return mask
    .replace(/[Dd]{1,2}/, day)
    .replace(/[Mm]{1,2}/, month)
    .replace(/[Yy]{1,4}/, year);
}

export function parseIsoDateRangeToMaskedDate(dateRange: IsoDateRange, mask: string): string {
  if (!dateRange.to && !dateRange.from) return '';

  return `${parseIsoDateToMaskedDate(dateRange.from, mask)} - ${parseIsoDateToMaskedDate(dateRange.to, mask)}`;
}

export function formatDateToString(date: Date, mask: string): string {
  return format(date, mask);
}

export function containsMaskCharacters(date: string): boolean {
  return /[A-Za-z]/.test(date);
}

export function formatDateToDateIso(date: Date): string {
  return formatISO(date, { representation: 'date' });
}

export function isBeforeDate(date: Date, comparingDate: Date | number): boolean {
  return isBefore(date, comparingDate);
}

export function isAfterDate(date: Date, comparingDate: Date): boolean {
  return isBefore(comparingDate, date);
}

export function getYear(date: Date): number {
  return _getYear(date);
}

export function getMonth(date: Date): number {
  return _getMonth(date);
}

const dateFormats: Record<DateFormat, string> = {
  DDMMYYYY: 'dd.MM.yyyy',
  MMDDYYYY: 'MM/dd/yyyy',
};

export function getDateMask(dateFormat: DateFormat): string {
  return dateFormats[dateFormat];
}

export function getDateRangeMask(dateFormat: DateFormat): string {
  return `${dateFormats[dateFormat]} - ${dateFormats[dateFormat]}`;
}

export function getToday(): Date {
  return startOfToday();
}

export function addDays(date: Date, days: number) {
  return date.setUTCDate(date.getUTCDate() + days);
}

export function addMonths(date: Date, months: number) {
  return date.setUTCMonth(date.getUTCMonth() + months);
}

export function addQuarters(date: Date, quarters: number) {
  return addMonths(date, quarters * 3);
}

export function addYears(date: Date, years: number) {
  return date.setUTCFullYear(date.getUTCFullYear() + years);
}
