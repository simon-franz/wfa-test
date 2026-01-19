// TODO: Evaluate if this file should be moved to smartface
type ChartEventPropsType = {
  targetSfId: Array<string>;
  action: string;
  filename: string;
  includeTitle: boolean;
  includeSubtitle: boolean;
};

export type ChartActionEventType = CustomEvent<ChartEventPropsType>;
