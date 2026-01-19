import type { CreateEventType } from './CreateEventType.ts';

export type CopyToClipboardEventPropsType = {
  text: string;
};

export type CopyToClipboardEventType = CreateEventType<'copy-to-clipboard'> & CopyToClipboardEventPropsType;
