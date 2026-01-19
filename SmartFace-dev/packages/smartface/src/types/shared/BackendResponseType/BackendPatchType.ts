import type { Update } from './UpdateTypes';

export type BackendPatchType = {
  patchId: string;
  updates: Update[];
};
