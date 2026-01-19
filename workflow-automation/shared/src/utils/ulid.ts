import { ulid as generateUlid, decodeTime } from 'ulid';

export function ulid(): string {
  return generateUlid();
}

export function ulidTimestamp(id: string): Date {
  return new Date(decodeTime(id));
}

export function isValidUlid(id: string): boolean {
  if (typeof id !== 'string' || id.length !== 26) {
    return false;
  }

  const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
  return ulidRegex.test(id);
}
