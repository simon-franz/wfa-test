// @ts-check

import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { pieChartFactory } from '../../../../shared/smartFaceComponentFactories/extension/pieChartFactory.js';
import { sidebar } from '../shared/sidebar.js';

/** @type {import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType}  */

export const chartFullHeightPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Chart Full Height Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('chart-full-height-page', ['component-pages']),
          content: {
            componentChildren: [
              pieChartFactory(
                {
                  tooltip: true,
                  dataHover: true,
                  colorSet: 'bright',
                  data: [
                    {
                      name: 'php',
                      value: 400,
                    },
                    {
                      name: 'scala',
                      value: 300,
                    },
                    {
                      name: 'stylus',
                      value: 558,
                    },
                    {
                      name: 'haskell',
                      value: 573,
                    },
                    {
                      name: 'elixir',
                      value: 174,
                    },
                  ],
                  dataSelection: true,
                  legend: {
                    interactive: false,
                  },
                  dataLabelFormat: 'percentage',
                },
                'pie-chart',
              ),
            ],
          },
        }),
      ],
    }),
  ],
});
