import type { CreateEventType } from './CreateEventType.ts';

export type UserlaneEventPropsType = {
  action: 'open-assistant' | 'start-tour';
  tour?: { id: string; step?: number };
};

export type UserlaneEventType = CreateEventType<'userlane-action'> & UserlaneEventPropsType;
