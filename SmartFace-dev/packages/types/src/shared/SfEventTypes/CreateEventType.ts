import type { SfEventType } from './SfEventType.ts';

export type CreateEventType<EventType extends string> = {
  type: EventType;
} & RequestDataType;

export type RequestDataType = {
  data: Record<string, unknown>;

  blockUi?: boolean;
  childEvents?: SfEventType;
  sendBackendPatches?: boolean;
  sendFormData?: boolean;
  sfId?: string;
  url?: string;
};
