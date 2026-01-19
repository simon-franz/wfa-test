import type { SideEffectType } from './SideEffectTypes';

export type BackendResponseType = Partial<{
  sideEffects: Array<SideEffectType>;
}>;
