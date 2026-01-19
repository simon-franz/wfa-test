import type { CreateEventType } from './CreateEventType.ts';

export type ChartEventPropsType = {
  targetSfId: Array<string>;
  action: string;
  filename: string;
  includeTitle: boolean;
  includeSubtitle: boolean;
};

export type ChartEventType = CreateEventType<'chart-action'> & ChartEventPropsType;
