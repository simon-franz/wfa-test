import _isPlainObject from 'lodash/isPlainObject';

export function isPlainObject(testSubject: unknown): testSubject is Record<string | number | symbol, any> {
  return _isPlainObject(testSubject);
}
