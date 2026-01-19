import type { CreateEventType } from './CreateEventType.ts';

export type TreeGraphEventPropsType = { targetSfIds?: string[]; action: string; filename: string };

export type TreeGraphEventType = CreateEventType<'tree-graph-action'> & TreeGraphEventPropsType;
