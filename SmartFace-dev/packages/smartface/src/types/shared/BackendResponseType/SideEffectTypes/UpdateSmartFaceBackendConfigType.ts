import type { SmartFaceBackendConfig } from '../../SmartFaceBackendConfig';

export type UpdateSmartFaceBackendConfigType = {
  type: 'updateSmartFaceBackendConfig';
  fields: SmartFaceBackendConfig;
  merge?: boolean;
};
