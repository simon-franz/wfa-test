import { generateLoremSentences, generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { preset } from '../../utils/preset';
import type { BarChartBackendProps } from '@hrworks/smartface/adapters/extension/BarChartAdapter/BarChartAdapter.types';

export const barChartDefaultProps: BarChartBackendProps = {
  ...preset.chartDefaultProps,
  type: 'column',
  legend: {
    ...preset.chartDefaultProps.legend,
  },
  yAxis: {
    title: generateLoremWords(),
    majorTickPostfix: '%',
    gridline: true,
  },
  xAxis: {
    type: 'datetime',
    pointStart: '2023-05-01',
    pointIntervalUnit: 'quarter',
    title: generateLoremSentences(),
    gridline: true,
  },
  data: [
    {
      name: generateLoremWords(),
      value: [-137, -79, 105, -40, 41, -200, 88, 244, 274, 26, 122, 162],
    },
    {
      name: generateLoremWords(),
      value: [248, -236, 105, 95, -279, 94, 22, -55, 2, 249, -57, 230],
    },
  ],
};
