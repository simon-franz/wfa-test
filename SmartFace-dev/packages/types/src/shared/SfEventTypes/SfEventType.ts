import type { ChartEventType } from './ChartEventType.ts';
import type { CopyToClipboardEventType } from './CopyToClipboardEventType.ts';
import type { FileExportEvent } from './FileExportEvent.types.js';
import type { FileManagerPostEvent } from './FileManagerPostEventType.ts';
import type { RedirectEventType } from './RedirectEventType.ts';
import type { RequestEventType } from './RequestEventType.ts';
import type { TreeGraphEventType } from './TreeGraphEventType.ts';
import type { UserlaneEventType } from './UserlaneEventType.ts';

export type EventUnion =
  | RequestEventType
  | RedirectEventType
  | FileManagerPostEvent
  | ChartEventType
  | UserlaneEventType
  | TreeGraphEventType
  | FileExportEvent
  | CopyToClipboardEventType;

export type SfEventType = EventUnion[];
