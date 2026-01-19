import { mockData } from '@hrworks/cypress-utils/fixtures';
import { generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { S as ChartWrapperStyles } from '../ChartWrapper/ChartWrapper.styles';
import { LineChart } from './LineChart';
import type { LineChartProps } from './LineChart.types';

const {
  boolean,
  generateChartDataValues,
  generateChartDataVariations,
  chartLegendCombinations,
  chartYAxisCombinations,
  chartXAxisCombinations,
  testString,
} = mockData;

const generateXAxisCombinationsWithSelectiveMinorTick = (): (LineChartProps['xAxis'] | undefined)[] => {
  const minorTickIndices = new Set([3, 6, 9]);

  return chartXAxisCombinations.map((xAxis, index) =>
    xAxis && minorTickIndices.has(index) ? { ...xAxis, minorTick: true } : xAxis,
  );
};

const defaultProps: Partial<LineChartProps> = {
  disableAnimation: true,
  type: 'line',
  dataLabel: true,
  legend: {
    enabled: true,
  },
  yAxis: {
    title: testString,
  },
  xAxis: {
    title: testString,
    majorTick: true,
    type: 'datetime',
    pointStart: '2023-05-01',
    pointIntervalUnit: 'quarter',
  },
  data: [
    { name: 'Entry-1', value: generateChartDataValues(3, 0) },
    { name: 'Entry-2', value: generateChartDataValues(3, 3) },
    { name: 'Entry-3', value: generateChartDataValues(3, 6) },
  ],
};

const renderLineChart = (props: Partial<LineChartProps>) => {
  renderComponentWithTheme(LineChart, { ...defaultProps, ...props });
  cy.viewport(750, 500);
  cy.get(`${ChartWrapperStyles.Wrapper}`).should('exist');
};

context('LineChart', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderLineChart,
      singleTests: {
        props: {
          dataLabel: ['intelligent', ...boolean],
          legend: chartLegendCombinations,
          dataMarker: boolean,
          type: ['line', 'area', 'areaStacked', 'areaStackedPercent', undefined],
          step: boolean,
          xAxis: generateXAxisCombinationsWithSelectiveMinorTick(),
          yAxis: chartYAxisCombinations,
          data: generateChartDataVariations(),
          colorSet: ['primary', 'secondary', undefined],
          radix: ['.', ',', undefined],
        },
      },
    });
  });
});
