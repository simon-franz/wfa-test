import type { CreateEventType } from './CreateEventType.ts';

export type FileExportEvent = CreateEventType<'file-export'> & {
  mode?: 'download' | 'print';
};
