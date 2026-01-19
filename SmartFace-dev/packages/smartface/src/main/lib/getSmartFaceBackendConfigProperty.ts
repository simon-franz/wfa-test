import isObject from 'lodash/isObject';

import type { SmartFaceBackendConfig } from '../../types/shared/SmartFaceBackendConfig';

declare global {
  interface Window {
    smartFaceBackendConfig?: SmartFaceBackendConfig | string;
    isSmartFaceBackendConfigObservable?: boolean;
  }
}

export function getSmartFaceBackendConfigProperty<T extends keyof SmartFaceBackendConfig>(
  property: T,
): SmartFaceBackendConfig[T] | null {
  return isObject(window.smartFaceBackendConfig) ? window.smartFaceBackendConfig[property] : null;
}
