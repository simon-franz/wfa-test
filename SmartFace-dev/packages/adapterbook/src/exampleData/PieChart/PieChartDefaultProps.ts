import random from 'lodash/random';

import { preset } from '../../utils/preset';
import type { PieChartBackendProps } from '@hrworks/smartface/adapters/extension/PieChartAdapter/PieChartAdapter.types';

const data = ['php', 'scala', 'stylus', 'haskell', 'elixir'];

export const pieChartDefaultProps: PieChartBackendProps = {
  ...preset.chartDefaultProps,
  data: data.map((name) => ({
    name,
    value: random(100, 600),
  })),
  dataSelection: true,
  legend: {
    ...preset.chartDefaultProps.legend,
  },
  dataLabelFormat: 'percentage',
};
