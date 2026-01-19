import { useTheme } from '@emotion/react';
import { LocalizationContext } from '@hrworks/localization';
import { addDays, addMonths, addQuarters, addYears, isBeforeDate } from '@hrworks/sui-shared/functions/dateFunctions';
import { getBrightness } from '@hrworks/sui-shared/functions/getBrightness';
import type { HexColor } from '@hrworks/types/shared/UiTypes';
import type HighchartsReact from 'highcharts-react-official';
import { computed, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useContext, useMemo } from 'react';

import { ChartWrapper } from '../ChartWrapper';
import { useChart } from '../hooks/useChart';
import { S } from '../hooks/useHighcharts.styles';
import type { BarChartProps } from './BarChart.types';

export const BarChart = observer((props: BarChartProps) => {
  const { translate } = useContext(LocalizationContext);
  const { chartProps, colorSet, legend } = useChart(props);
  const theme = useTheme();

  const {
    data = [],
    xAxis,
    yAxis,
    dataLabel = 'intelligent',
    tooltip = false,
    dataHover,
    type,
    noDataText,
    tooltipPostfix,
    radix = ',',
    fullHeight,
    disableAnimation,
  } = chartProps;

  const timestamp = computed<number>(() => {
    if (!xAxis?.pointStart || typeof xAxis?.pointStart !== 'string') {
      return new Date().setUTCHours(0, 0, 0, 0);
    }
    const [year, month, day] = xAxis.pointStart.split('-');

    return year && month && day ? Date.UTC(+year, +month - 1, +day) : new Date().setUTCHours(0, 0, 0, 0);
  });

  const tickPosition = computed(() => {
    const start = yAxis?.majorTickStart ?? 0;
    const end = yAxis?.majorTickEnd;
    if (end == null) {
      return null;
    }
    const ticks = [];
    const interval = yAxis?.majorTickInterval ?? Math.round((end - start) / 10);
    for (let i: number = start; i < end; i = i + interval) {
      ticks.push(i);
    }
    ticks.push(end);

    return ticks;
  });

  const currentTheme = useTheme();
  const chartStyles = useMemo(() => S.componentConfig(currentTheme), [currentTheme]);

  const highchartsData = computed(
    () =>
      data.map(({ name, value }, index) => ({
        name,
        data: value,
        color: {
          pattern: {
            path: {
              d: chartStyles.patterns[Math.floor(index / colorSet.length) % chartStyles.patterns.length],
            },
            width: 5,
            height: 5,
            color: colorSet[index % colorSet.length],
          },
        },
      })) || [],
  );

  const numData = computed(() => {
    const numDataSet = data.length;
    let numDataPoints = 0;
    for (const dataset of data) {
      numDataPoints += dataset.value.length / numDataSet;
    }

    return { numDataSet, numDataPoints };
  });

  const options = computed<HighchartsReact.Props>(() => ({
    lang: {
      noData: noDataText ?? translate('no-data'),
    },
    tooltip: {
      enabled:
        dataLabel === 'intelligent' && numData.get().numDataSet <= 5 && numData.get().numDataPoints <= 10
          ? false
          : (dataLabel === 'intelligent' &&
              ((numData.get().numDataSet <= 5 && numData.get().numDataPoints > 10) ||
                numData.get().numDataSet > 10 ||
                (numData.get().numDataSet >= 6 && numData.get().numDataSet <= 10))) ||
            tooltip,
      shared:
        (dataLabel === 'intelligent' && numData.get().numDataSet >= 6 && numData.get().numDataSet <= 10) ||
        tooltip === 'shared',
      distance: 25,
      valueSuffix: tooltipPostfix ? ' ' + tooltipPostfix : '',
      pointFormatter() {
        const value = this.y % 1 === 0 ? this.y : this.y.toFixed(2);
        const formattedValue = value.toString().replace('.', radix);
        const { valueSuffix } = this.series.chart.tooltip.options;

        return `${this.series.name}: <b>${formattedValue}${valueSuffix}</b><br/>`;
      },
      xDateFormat:
        xAxis?.type === 'datetime'
          ? xAxis?.pointIntervalUnit === 'year'
            ? '%Y'
            : xAxis?.pointIntervalUnit === 'quarter'
              ? `${translate('chart-quarter')}%q/%Y`
              : xAxis?.pointIntervalUnit === 'month' && '%B %Y'
          : undefined,
    },
    series: highchartsData.get(),
    xAxis: {
      type: xAxis?.categories && xAxis?.categories.length > 0 ? 'category' : xAxis?.type,
      title: { text: xAxis?.title },
      categories: toJS(xAxis?.categories),
      endOnTick: xAxis?.categories && xAxis?.categories.length > 0 ? true : undefined,
      max: xAxis?.categories ? xAxis?.categories.length - 1 : undefined,
      gridLineWidth: (xAxis?.gridline ?? false) ? 1 : 0,
      tickWidth: xAxis?.majorTick ? 1 : 0,
      min: xAxis?.categories ? 0 : xAxis?.type === 'datetime' ? timestamp.get() : xAxis?.pointStart,
      reversed: xAxis?.reversed ?? false,
      labels: {
        format:
          xAxis?.type === 'datetime'
            ? xAxis?.pointIntervalUnit === 'year'
              ? '{value:%Y}'
              : xAxis?.pointIntervalUnit === 'quarter'
                ? `{value:${translate('chart-quarter')}%q/%Y}`
                : xAxis?.pointIntervalUnit === 'month' && '{value:%B %Y}'
            : undefined,
      },

      tickPositioner: function () {
        if (xAxis?.categories) {
          return Array.from({ length: xAxis.categories.length }, (_, i) => i);
        }
        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);

        for (let i = 0; i < 10; ++i) {
          addMonths(date, 1);
        }
        const positions = [];
        if (xAxis?.type === 'datetime') {
          const firstTick = new Date(timestamp.get());
          const interval = xAxis?.pointInterval && xAxis.pointInterval > 0 ? xAxis.pointInterval : 1;
          const intervalFunction =
            xAxis?.pointIntervalUnit === 'year'
              ? addYears
              : xAxis?.pointIntervalUnit === 'month'
                ? addMonths
                : xAxis?.pointIntervalUnit === 'quarter'
                  ? addQuarters
                  : addDays;

          positions.push(firstTick.getTime());

          for (let i = firstTick; isBeforeDate(i, this.max); intervalFunction(i, interval)) {
            positions.push(i.getTime());
          }
        } else {
          const firstTick: number = typeof xAxis?.pointStart === 'string' ? 1 : xAxis?.pointStart || 0;
          const interval = xAxis?.pointInterval && xAxis.pointInterval > 0 ? xAxis.pointInterval : 1;
          for (let i = firstTick; i < this.max + interval; i += interval) {
            positions.push(i);
          }
        }

        return positions;
      },
    },
    yAxis: {
      title: { text: yAxis?.title },
      gridLineWidth: (yAxis?.gridline ?? true) ? 1 : 0,
      tickWidth: yAxis?.majorTick ? 1 : 0,
      tickInterval: yAxis?.majorTickInterval,
      minorTicks: yAxis?.minorTick,
      min: numData.get().numDataSet < 1 ? 0 : yAxis?.majorTickStart,
      max: numData.get().numDataSet < 1 ? 10 : yAxis?.majorTickEnd,
      tickPositions: tickPosition.get(),
      allowDecimals: yAxis?.decimals || false,
      plotLines: [
        {
          value: yAxis?.threshold,
          color: chartStyles.crosshairThresholdColor,
          width: 1,
          zIndex: 3,
        },
      ],
      labels: {
        format: yAxis?.majorTickPostfix ? '{value:.0f}' + ' ' + yAxis?.majorTickPostfix : '',
      },
    },
    chart: {
      ...S.styles(currentTheme).chart,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: type === 'bar' || type === 'barStacked' || type === 'barStackedPercent' ? 'bar' : 'column',
      showAxes: true,
      spacingBottom: 0,
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
        color: legend.interactive ? chartStyles.legendHoverColor : null,
        cursor: (legend.interactive ?? true) ? 'pointer' : 'default',
      },
    },
    plotOptions: {
      series: {
        ...(disableAnimation && { animation: false }),
        threshold: yAxis?.threshold || 0,
        stacking:
          type === 'barStacked' || type === 'columnStacked'
            ? 'normal'
            : type === 'barStackedPercent' || type === 'columnStackedPercent'
              ? 'percent'
              : undefined,
        events: {
          legendItemClick: legend.interactive === false ? () => false : null,
        },
        dataLabels: {
          enabled:
            dataLabel === 'intelligent'
              ? numData.get().numDataSet <= 5 && numData.get().numDataPoints <= 10
              : (dataLabel ?? 'intelligent'),
          formatter(this: Highcharts.PointLabelObject): string {
            // determine dataLabel-color for barStacked and columnStacked depending on brightness of bar / column
            const calculateDataLabelColor = (backgroundColor: string = theme.sqwTier2Color.text.default) => {
              const backgroundBrightness = getBrightness(backgroundColor as HexColor);
              const darkLabelColor = theme.sqwTier1.color.black;
              const brightLabelColor = theme.sqwTier1.color.white;

              return backgroundBrightness <= 127.5 ? brightLabelColor : darkLabelColor;
            };

            const dataLabelColor =
              type === 'barStacked' ||
              type === 'barStackedPercent' ||
              type === 'columnStacked' ||
              type === 'columnStackedPercent'
                ? calculateDataLabelColor(this.color?.toString())
                : undefined;

            // format dataLabel
            let value = this.y as number;
            value = value % 1 === 0 ? Math.floor(value) : Number.parseFloat(value.toFixed(2));
            const formattedValue = value.toString().replace('.', radix);

            return `<span style='color: ${dataLabelColor}'>${formattedValue}</span>`;
          },
        },
        cursor: 'default',
        connectNulls: true,
        ...(xAxis?.categories
          ? { pointStart: 0, pointInterval: 1 }
          : {
              pointIntervalUnit:
                xAxis?.type === 'datetime'
                  ? xAxis?.pointIntervalUnit === 'quarter'
                    ? 'month'
                    : xAxis?.pointIntervalUnit || 'day'
                  : null,
              pointStart: xAxis?.type === 'datetime' ? timestamp.get() : (xAxis?.pointStart ?? 1),
              pointInterval:
                xAxis?.type === 'datetime' && xAxis?.pointIntervalUnit === 'quarter' ? 3 : xAxis?.pointInterval || 1,
            }),
        states: {
          inactive: { enabled: dataHover },
          hover: { enabled: dataHover },
        },
      },
    },
    exporting: { enabled: false, fallbackToExportServer: false },
    fullscreen: { enabled: true },
    accessibility: { enabled: false },
  }));

  return <ChartWrapper fullHeight={fullHeight} options={options.get()} {...props} />;
});
