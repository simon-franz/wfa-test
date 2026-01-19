import type { HTMLAttributes } from 'react';

import type { ChartData, ChartProps } from '@hrworks/types/components/extension/Chart.types';

export type PieChartProps = Omit<ChartProps<ChartData<number>[]>, 'xAxis' | 'yAxis'> & {
  tooltip?: boolean;
  dataLabelFormat?: 'decimal' | 'percentage' | 'decimalAndPercentage';
  tooltipFormat?: 'decimal' | 'percentage' | 'decimalAndPercentage';
  dataSelection?: boolean;
  type?: 'pie' | 'donut';
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;
