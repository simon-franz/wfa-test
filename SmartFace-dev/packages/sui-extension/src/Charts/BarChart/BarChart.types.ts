import type { HTMLAttributes } from 'react';

import type { ChartData, ChartProps, XAxis } from '@hrworks/types/components/extension/Chart.types';

export type BarChartProps = Omit<ChartProps<ChartData<number[]>[]>, 'xAxis' | 'tooltip'> & {
  tooltip?: boolean | 'shared';
  type?: 'bar' | 'barStacked' | 'barStackedPercent' | 'column' | 'columnStacked' | 'columnStackedPercent';
  xAxis?: Omit<XAxis, 'minorTick'>;
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;
