export type LogColor =
  | 'reset'
  | 'bright'
  | 'dim'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'black'
  | 'orange';

export type LogColors = Record<LogColor, string>;

export type LogSectionOptions = {
  dividerChar?: string;
  dividerLength?: number;
  color?: LogColor;
  bgColor?: LogColor;
};
