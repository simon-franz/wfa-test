import type { HTMLAttributes } from 'react';

import type { Axis, ChartData, ChartProps } from '@hrworks/types/components/extension/Chart.types';

export type LineChartProps = Omit<ChartProps<ChartData<number[]>[]>, 'tooltip'> &
  Axis & {
    dataMarker?: boolean;
    type?: 'line' | 'area' | 'areaStacked' | 'areaStackedPercent';
    tooltip?: boolean | 'shared';
    step?: boolean;
  } & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;
