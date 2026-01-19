import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { Axis, ChartData, ChartProps } from '@hrworks/types/components/extension/Chart.types';

export type LineChartBackendProps = Omit<ChartProps<ChartData<number[]>[]>, 'tooltip'> &
  Axis & {
    dataMarker?: boolean;
    type?: 'line' | 'area' | 'areaStacked' | 'areaStackedPercent';
    tooltip?: boolean | 'shared';
    step?: boolean;
  };

export type LineChartBackendDefinition = SmartFaceBackendComponent<'LineChart', LineChartBackendProps>;

export type LineChartAdapterProps = SmartFaceAdapterPropsType<LineChartBackendDefinition>;
