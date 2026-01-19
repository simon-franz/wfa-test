import { computed } from 'mobx';

import { S } from './useChart.styles';
import type { ChartColorSet, Legend } from '@hrworks/types/components/extension/Chart.types';

export const useChart = <T extends { colorSet?: ChartColorSet }>({
  colorSet = 'primary',
  legend = {},
  ...chartProps
}: T & { legend?: Legend }) => {
  const {
    align = 'left',
    enabled = true,
    layout = 'horizontal',
    verticalAlign = 'bottom',
    interactive = true,
  } = legend;

  const getLegendAlign = computed(() => {
    if (layout === 'vertical' && verticalAlign === 'middle') {
      return align === 'left' || align === 'right' ? align : 'left';
    }

    return align;
  });

  const getLegendVerticalAlign = computed(() => {
    if (layout === 'horizontal' && verticalAlign === 'middle') {
      return 'bottom';
    }

    return verticalAlign;
  });

  return {
    chartProps,
    colorSet: S.colorSets[colorSet] || S.colorSets.primary,
    legend: {
      align: getLegendAlign.get(),
      enabled,
      layout,
      verticalAlign: getLegendVerticalAlign.get(),
      interactive,
    },
  };
};
