import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { ChartData, ChartProps } from '@hrworks/types/components/extension/Chart.types';

export type PieChartBackendProps = Omit<ChartProps<ChartData<number>[]>, 'xAxis' | 'yAxis'> & {
  tooltip?: boolean;
  dataLabelFormat?: 'decimal' | 'percentage' | 'decimalAndPercentage';
  tooltipFormat?: 'decimal' | 'percentage' | 'decimalAndPercentage';
  dataSelection?: boolean;
  type?: 'pie' | 'donut';
};

export type PieChartBackendDefinition = SmartFaceBackendComponent<'PieChart', PieChartBackendProps>;

export type PieChartAdapterProps = SmartFaceAdapterPropsType<PieChartBackendDefinition>;
