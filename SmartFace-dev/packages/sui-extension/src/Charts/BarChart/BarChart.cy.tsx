import { mockData } from '@hrworks/cypress-utils/fixtures';
import { generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { S as ChartWrapperStyles } from '../ChartWrapper/ChartWrapper.styles';
import { BarChart } from './BarChart';
import type { BarChartProps } from './BarChart.types';

const {
  generateChartDataValues,
  generateChartDataVariations,
  chartLegendCombinations,
  chartXAxisCombinations,
  chartYAxisCombinations,
  testString,
} = mockData;

const defaultProps: Partial<BarChartProps> = {
  disableAnimation: true,
  type: 'column',
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

const renderBarChart = (props: Partial<BarChartProps>) => {
  renderComponentWithTheme(BarChart, { ...defaultProps, ...props });
  cy.viewport(750, 500);
  cy.get(`${ChartWrapperStyles.Wrapper}`).should('exist');
};

context('BarChart', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderBarChart,
      singleTests: {
        props: {
          dataLabel: [true, false, 'intelligent', undefined],
          legend: chartLegendCombinations,
          type: [
            'bar',
            'barStacked',
            'barStackedPercent',
            'column',
            'columnStacked',
            'columnStackedPercent',
            undefined,
          ],
          xAxis: chartXAxisCombinations,
          yAxis: chartYAxisCombinations,
          data: generateChartDataVariations(),
        },
      },
    });
  });
});
