import type { CreateEventType } from './CreateEventType.ts';

export type RedirectEventType = Pick<CreateEventType<'redirect'>, 'type' | 'childEvents'> & {
  url: string;
};
