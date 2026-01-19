import type HighchartsReact from 'highcharts-react-official';
import type { HTMLAttributes } from 'react';

import type { UseHighchartsProps } from '../hooks/useHighcharts';

export type ChartWrapperProps = Pick<UseHighchartsProps, 'id' | 'exportTitle' | 'exportSubtitle'> & {
  options: HighchartsReact.Props;
  fullHeight?: boolean;
} & HTMLAttributes<HTMLDivElement>;
