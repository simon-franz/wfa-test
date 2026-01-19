import type { CreateEventType } from './CreateEventType.ts';

export type FileManagerPostEvent = CreateEventType<'file-manager-post'> & {
  targetSfIds?: string[];
};
