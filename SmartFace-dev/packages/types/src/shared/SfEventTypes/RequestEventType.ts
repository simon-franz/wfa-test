import type { CreateEventType, RequestDataType } from './CreateEventType.ts';

export type RequestEventType = CreateEventType<'request'> & RequestDataType;
