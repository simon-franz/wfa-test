import { Notification } from '@hrworks/sui-shared/classes/Notification';
import { FALLBACK_IMAGE_BASE64 } from '@hrworks/sui-shared/constants';
import { generateLoremSentences, generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';
import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';
import {
  alignTitles,
  colors,
  corners,
  floatDirections,
  gaps,
  justifyContents,
  sizes,
  textAligns,
  validationStates,
} from '@hrworks/types/shared/UiTypes';
import times from 'lodash/times';

import { mockComponents } from './mockComponents/mockComponents';
import type { ChartData, ChartProps, Legend, XAxis, YAxis } from '@hrworks/types/components/extension/Chart.types';

const { Icon } = mockComponents;

const filteredJustifyContent = justifyContents.filter((prop) => prop !== 'space-around' && prop !== 'space-evenly');

const mockNotification = [
  new Notification(
    {
      type: 'addNotification',
      message: generateLoremWords(1),
      title: generateLoremWords(1),
    },
    () => {},
  ),
];

type MockPageProps = {
  onDismissNotification: (notificationId: Notification['id'], event?: SfEventType) => void;
  notifications: Notification[];
};

const mockPageContext: MockPageProps = {
  notifications: mockNotification,
  onDismissNotification: () => {},
};

const chartLegendCombinations: (Legend | undefined)[] = [
  { enabled: false },
  { enabled: true },
  { enabled: true, align: 'left' },
  { enabled: true, align: 'center' },
  { enabled: true, align: 'right' },
  { enabled: true, layout: 'horizontal' },
  { enabled: true, layout: 'horizontal', align: 'left' },
  { enabled: true, layout: 'horizontal', align: 'center' },
  { enabled: true, layout: 'horizontal', align: 'right' },
  { enabled: true, layout: 'vertical' },
  { enabled: true, layout: 'vertical', verticalAlign: 'top' },
  { enabled: true, layout: 'vertical', verticalAlign: 'middle' },
  { enabled: true, layout: 'vertical', verticalAlign: 'bottom' },
  { enabled: true, verticalAlign: 'top' },
  { enabled: true, verticalAlign: 'middle' },
  { enabled: true, verticalAlign: 'bottom' },
  { enabled: true, layout: 'vertical', align: 'left' },
  { enabled: true, layout: 'vertical', align: 'center' },
  { enabled: true, layout: 'vertical', align: 'right' },
  undefined,
];

const chartXAxisCombinations: (XAxis | undefined)[] = [
  { type: 'linear', title: generateLoremWords(3), gridline: true, majorTick: false },
  {
    type: 'datetime',
    title: generateLoremWords(3),
    pointStart: '2024-01-01',
    pointIntervalUnit: 'month',
    gridline: true,
  },
  {
    categories: [generateLoremWords(3), generateLoremWords(3), generateLoremWords(3)],
    majorTick: true,
  },
  { type: 'linear', title: generateLoremWords(3), reversed: true, gridline: true, majorTick: false },
  {
    type: 'datetime',
    pointStart: '2023-06-15',
    pointInterval: 2,
    pointIntervalUnit: 'quarter',
  },
  {
    title: undefined,
    categories: [generateLoremWords(3), generateLoremWords(3), generateLoremWords(3)],
    gridline: true,
    majorTick: true,
    reversed: true,
  },
  {
    type: 'datetime',
    title: generateLoremWords(3),
    pointStart: '2024-03-01',
    pointIntervalUnit: 'day',
    gridline: true,
    majorTick: false,
  },
  {
    type: 'linear',
    categories: [generateLoremWords(3), generateLoremWords(3), generateLoremWords(3)],
    reversed: true,
  },
  {
    type: 'datetime',
    title: generateLoremWords(3),
    gridline: true,
    majorTick: true,
    pointStart: '2024-01-01',
    pointInterval: 3,
    pointIntervalUnit: 'year',
    reversed: false,
  },
  undefined,
];

const chartYAxisCombinations: (YAxis | undefined)[] = [
  { title: generateLoremWords(3), gridline: true, majorTick: false, decimals: true },
  { title: generateLoremWords(1), threshold: 200, majorTickPostfix: '%', crosshair: true },
  { gridline: true, minorTick: true, majorTickInterval: 25, decimals: false },
  { title: undefined, majorTick: false, threshold: 150, majorTickPostfix: ' €', gridline: true },
  { majorTickStart: 50, majorTickEnd: 300, majorTickInterval: 50, decimals: true },
  { title: generateLoremWords(3), gridline: true, minorTick: true, threshold: 75, majorTickPostfix: ' kg' },
  { majorTick: false, decimals: false, majorTickStart: 0, majorTickInterval: 100 },
  {
    title: generateLoremWords(3),
    gridline: true,
    majorTick: true,
    minorTick: true,
    threshold: 500,
    decimals: true,
  },
  {
    title: generateLoremWords(3),
    gridline: true,
    majorTick: true,
    minorTick: true,
    threshold: 1000,
    majorTickStart: 0,
    majorTickEnd: 2000,
    majorTickInterval: 200,
    majorTickPostfix: ' USD',
    decimals: true,
  },
  undefined,
];

const DATA_BASE_VALUES = [
  137.34, 79, 105.12, 40, 41.54, 248.21, 236.2, 95, 297.6, 52.32, 151, 219.74, 76.1, 248, 97.76, 222.2, 208, 96.01,
  234.6, 135.5, 272, 181, 142.38, 189.7, 156, 324, 278, 185.76, 92.2, 187.35, 143.4, 225, 156.43, 276.22, 134.5,
] as const;

const generateChartDataValues = (valueCount: number, startOffset: number, sourceValues = DATA_BASE_VALUES): number[] =>
  Array.from({ length: valueCount }, (_, index) => sourceValues[(startOffset + index) % sourceValues.length]);

const generateChartDataVariations = (): ChartProps<ChartData<number[]>[]>['data'][] => [
  // 1. Empty
  [],
  // 2. One Entry, no Values
  [{ name: 'Entry-1', value: [] }],
  // 3. One Entry, some Values (3-5 points)
  [{ name: 'Entry-1', value: [137, 79, 105] }],
  [{ name: 'Entry-1', value: [137, 79, 105, 40, 41] }],
  // 4. One Entry, a lot of values (15+ points)
  [{ name: 'Entry-1', value: generateChartDataValues(15, 0) }],
  [{ name: 'Entry-1', value: generateChartDataValues(25, 0) }],
  // 5. Multiple Entries, mixed empty/filled values
  [
    { name: 'Entry-1', value: [] },
    { name: 'Entry-2', value: [248, 236, 95] },
  ],
  [
    { name: 'Entry-1', value: [137, 79] },
    { name: 'Entry-2', value: [] },
    { name: 'Entry-3', value: [105, 40, 41] },
  ],
  // 6. Multiple Entries, all with some values
  [
    { name: 'Entry-1', value: generateChartDataValues(3, 0) },
    { name: 'Entry-2', value: generateChartDataValues(3, 3) },
    { name: 'Entry-3', value: generateChartDataValues(3, 6) },
  ],
  // 7. Multiple Entries, all with lots of values
  [
    { name: 'Entry-1', value: generateChartDataValues(20, 0) },
    { name: 'Entry-2', value: generateChartDataValues(20, 5) },
    { name: 'Entry-3', value: generateChartDataValues(20, 10) },
  ],
  // 8. Many entries (stress test)
  Array.from({ length: 20 }, (_, index) => ({
    name: `Entry-${index + 1}`,
    value: generateChartDataValues(5, index * 2),
  })),
  // 9. Long names with short values
  [
    { name: generateLoremWords(3), value: [137, 79] },
    { name: generateLoremSentences(2), value: [105, 40] },
  ],
  // 10. Long names with many values
  [
    { name: generateLoremWords(3), value: generateChartDataValues(15, 0) },
    { name: generateLoremSentences(2), value: generateChartDataValues(15, 5) },
    { name: generateLoremSentences(2), value: generateChartDataValues(15, 10) },
  ],
  // 11. All long names (legend stress test)
  Array.from({ length: 3 }, (_, index) => ({
    name: generateLoremSentences(2),
    value: generateChartDataValues(3, index * 2),
  })),
];

export const mockData = {
  testURL: 'https://example.com/test',
  boolean: [true, false, undefined],
  testStrings: [generateLoremWords(3), generateLoremSentences(2), undefined],
  testString: generateLoremWords(1),
  overflowString: generateLoremSentences(3),
  sizes: [...sizes, undefined],
  colors: [...colors, undefined],
  corners: [...corners, undefined],
  alignTitles: [...alignTitles, undefined],
  textAligns: [...textAligns, undefined],
  validationStates: [...validationStates, undefined],
  floatDirections: [...floatDirections, undefined],
  mainAxisOffset: [-20, 0, 20, undefined],
  commonChildren: [Icon, times(3, () => Icon), times(20, () => Icon), undefined],
  gaps: [...gaps, undefined],
  justifyContents: [...filteredJustifyContent, undefined],
  pageContext: mockPageContext,
  logos: [
    {
      src: FALLBACK_IMAGE_BASE64,
      alt: generateLoremWords(1),
      title: generateLoremWords(1),
    },
    {
      src: 'www.invalid-url.de',
      alt: generateLoremWords(1),
      title: generateLoremWords(1),
    },
    undefined,
  ],
  chartLegendCombinations,
  chartXAxisCombinations,
  chartYAxisCombinations,
  generateChartDataValues,
  generateChartDataVariations,
} as const;
