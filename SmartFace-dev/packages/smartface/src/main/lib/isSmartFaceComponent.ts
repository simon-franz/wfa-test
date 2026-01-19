import type { SmartFaceComponentsType } from '../../types/SmartFaceComponentsType';
import { isPlainObject } from './isPlainObject';

export function isSmartFaceComponent(testSubject: unknown): testSubject is SmartFaceComponentsType {
  return (
    isPlainObject(testSubject) && typeof testSubject.sfComponent === 'string' && typeof testSubject.sfId === 'string'
  );
}
