export type Legend = {
  enabled?: boolean;
  layout?: 'horizontal' | 'vertical' | 'proximate';
  align?: 'left' | 'right' | 'center';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  interactive?: boolean;
};

export type Axis = {
  gridline?: boolean;
  title?: string;
  majorTick?: boolean;
  minorTick?: boolean;
  crosshair?: boolean;
};

export type YAxis = Axis & {
  majorTickStart?: number;
  majorTickEnd?: number;
  majorTickInterval?: number;
  majorTickPostfix?: string;
  threshold?: number;
  decimals?: boolean;
};

export type XAxis = Axis & {
  categories?: string[];
  type?: 'linear' | 'datetime';
  pointStart?: string | number;
  pointInterval?: number;
  pointIntervalUnit?: 'day' | 'month' | 'quarter' | 'year';
  reversed?: boolean;
};

export type ChartProps<T> = {
  data?: T;
  xAxis?: XAxis;
  yAxis?: YAxis;
  dataLabel?: 'intelligent' | boolean;
  legend?: Legend;
  tooltip?: boolean | string;
  tooltipPostfix?: string;
  dataHover?: boolean;
  noDataText?: string;
  colorSet?: ChartColorSet;
  radix?: string;
  fullHeight?: boolean;
  disableAnimation?: boolean;
};

export type ChartData<T> = {
  name: string;
  value: T;
};

export type ChartColorSet = 'primary' | 'secondary';
