import type { Update } from '../UpdateTypes';

export type PatchType = {
  type: 'patch';
  updates: Update[];
};
