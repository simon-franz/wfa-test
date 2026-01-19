import type { ChartColorSet } from '@hrworks/types/components/extension/Chart.types';

const colorSets: Record<ChartColorSet, string[]> = {
  primary: [
    '#113863',
    '#62B3CB',
    '#95CBDB',
    '#FF0684',
    '#B8005C',
    '#FFA000',
    '#FDDC1D',
    '#63E2B2',
    '#11BE9D',
    '#008476',
  ],
  secondary: ['#1C314B', '#2A4C73', '#3B6DA5', '#5A8BC4', '#95B5D9', '#B4CAE4', '#3D3D3D', '#7A7A7A', '#999999'],
};

export const S = {
  colorSets,
} as const;
