import { useTheme } from '@emotion/react';
import { LocalizationContext } from '@hrworks/localization';
import { wrapLongString } from '@hrworks/sui-shared/functions/wrapLongString';
import type HighchartsReact from 'highcharts-react-official';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { useContext, useMemo } from 'react';

import { ChartWrapper } from '../ChartWrapper';
import { useChart } from '../hooks/useChart';
import { S } from '../hooks/useHighcharts.styles';
import type { PieChartProps } from './PieChart.types';

export const PieChart = observer((props: PieChartProps) => {
  const { chartProps, colorSet, legend } = useChart(props);
  const { translate } = useContext(LocalizationContext);

  const {
    tooltip = true,
    data = [],
    dataHover,
    dataSelection,
    dataLabel = 'intelligent',
    dataLabelFormat = 'percentage',
    tooltipFormat = 'decimalAndPercentage',
    type,
    noDataText,
    radix = ',',
    fullHeight,
  } = chartProps;

  const highchartsData = computed(
    () =>
      data.map((singleData, index) => ({
        name: singleData.name,
        y: singleData.value,
        color: {
          pattern: {
            path: {
              d: chartStyles.patterns[Math.floor(index / colorSet.length) % chartStyles.patterns.length],
            },
            width: 5,
            height: 5,
            patternTransform: 'scale(1.4 1.4)',
            color: colorSet[index % colorSet.length],
          },
        },
      })) || [],
  );

  const currentTheme = useTheme();
  const chartStyles = useMemo(() => S.componentConfig(currentTheme), [currentTheme]);

  const options = computed<HighchartsReact.Props>(() => ({
    lang: {
      noData: noDataText ?? translate('no-data'),
    },
    tooltip: {
      enabled: tooltip,
      formatter(this: Highcharts.PointLabelObject): string {
        const maxLengthTooltip = 30;
        const wrappedTooltip = wrapLongString(this.point.name, maxLengthTooltip);

        // 'percentage'
        let percentage = this.point.percentage || 0;
        percentage = percentage % 1 === 0 ? Math.floor(percentage) : Number.parseFloat(percentage.toFixed(2));
        const formattedPercentage = percentage.toString().replace('.', radix);
        // 'decimal'
        let value = this.y || 0;
        value = value % 1 === 0 ? Math.floor(value) : Number.parseFloat(value.toFixed(2));
        const formattedValue = value.toString().replace('.', radix);

        return `<span style="font-size: 10px line-height: 0" >${wrappedTooltip}</span><br><b>${
          tooltipFormat === 'decimal'
            ? formattedValue
            : tooltipFormat === 'percentage'
              ? `${formattedPercentage} %`
              : `${formattedValue} (${formattedPercentage} %)`
        }</b>`;
      },
    },
    series: [
      {
        data: highchartsData.get(),
        dataLabels: {
          style: {
            whiteSpace: 'nowrap',
          },
          enabled: dataLabel === 'intelligent' ? data.length <= 10 : dataLabel,
          formatter(this: Highcharts.PointLabelObject): string {
            const maxLengthDataLabel = 30;
            const wrappedLabel = wrapLongString(this.point.name, maxLengthDataLabel);

            let value = this.y || 0;
            let percentage = this.point.percentage || 0;
            value = value % 1 === 0 ? Math.floor(value) : Number.parseFloat(value.toFixed(2));
            const formattedValue = value.toString().replace('.', radix);
            percentage = percentage % 1 === 0 ? Math.floor(percentage) : Number.parseFloat(percentage.toFixed(2));
            const formattedPercentage = percentage.toString().replace('.', radix);

            return `<span>${wrappedLabel}: ${
              dataLabelFormat === 'decimal'
                ? formattedValue
                : dataLabelFormat === 'percentage'
                  ? `${formattedPercentage} %`
                  : `${formattedValue} (${formattedPercentage} %)`
            }</span>`;
          },
        },
      },
    ],
    chart: {
      ...S.styles(currentTheme).chart,
      type: 'pie',
      spacingBottom: 0,
    },
    plotOptions: {
      pie: {
        innerSize: type === 'donut' ? '60%' : 0,
        borderWidth: data.length <= 10 ? 2 : 0,
        cursor: dataSelection ? 'pointer' : 'default',
        allowPointSelect: dataSelection,
        point: {
          events: {
            legendItemClick: legend.interactive === false ? () => false : null,
          },
        },
      },
      series: {
        shadow: false,
        states: {
          inactive: { enabled: dataHover },
          hover: {
            enabled: dataHover,
            halo: {
              size: 0,
            },
          },
        },
      },
    },
    legend: {
      enabled: legend.enabled,
      layout: legend.layout,
      align: legend.align,
      verticalAlign: legend.verticalAlign,
      maxHeight:
        (legend.layout === 'vertical' && legend.verticalAlign !== 'middle' && legend.align === 'center') ||
        legend.layout === 'horizontal'
          ? 45
          : undefined,
      itemHoverStyle: {
        color: (legend.interactive ?? true) ? chartStyles.legendHoverColor : null,
        cursor: (legend.interactive ?? true) ? 'pointer' : 'default',
      },
    },
    exporting: { enabled: false, fallbackToExportServer: false },
    fullscreen: { enabled: true },
    accessibility: { enabled: false },
  }));

  return <ChartWrapper fullHeight={fullHeight} options={options.get()} {...props} />;
});
