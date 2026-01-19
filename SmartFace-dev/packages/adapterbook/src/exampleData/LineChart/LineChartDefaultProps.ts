import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';
import range from 'lodash/range';
import shuffle from 'lodash/shuffle';

import { preset } from '../../utils/preset';
import type { LineChartBackendProps } from '@hrworks/smartface/adapters/extension/LineChartAdapter/LineChartAdapter.types';

export const lineChartDefaultProps: LineChartBackendProps = {
  ...preset.chartDefaultProps,
  dataMarker: true,
  legend: {
    ...preset.chartDefaultProps.legend,
  },
  yAxis: {
    title: generateLoremWords(),
    majorTick: true,
    decimals: true,
    majorTickPostfix: '%',
  },
  xAxis: {
    title: generateLoremWords(),
    gridline: true,
    majorTick: true,
  },
  data: [
    {
      name: generateLoremWords(),
      value: shuffle(range(-150, 150, 10)),
    },
    {
      name: generateLoremWords(),
      value: shuffle(range(-150, 150, 10)),
    },
  ],
};
