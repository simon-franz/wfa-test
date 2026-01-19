import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { ChartData, ChartProps, XAxis } from '@hrworks/types/components/extension/Chart.types';

export type BarChartBackendProps = Omit<ChartProps<ChartData<number[]>[]>, 'xAxis' | 'tooltip'> & {
  tooltip?: boolean | 'shared';
  type?: 'bar' | 'barStacked' | 'barStackedPercent' | 'column' | 'columnStacked' | 'columnStackedPercent';
  xAxis?: Omit<XAxis, 'minorTick'>;
};

export type BarChartBackendDefinition = SmartFaceBackendComponent<'BarChart', BarChartBackendProps>;

export type BarChartAdapterProps = SmartFaceAdapterPropsType<BarChartBackendDefinition>;
