import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';
import type { SideEffectType } from './SideEffectTypes';

export type SmartFaceBackendDataType = {
  sfComponents?: Array<SmartFaceComponentsType>;
  sideEffects?: Array<SideEffectType>;
};
