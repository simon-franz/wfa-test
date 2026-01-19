// @ts-check

import { gridFactory, gridItemFactory } from '#shared/smartFaceComponentFactories/core/gridFactory';

import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { loadingAnimationFactory } from '../../../../shared/smartFaceComponentFactories/core/loadingAnimationFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

const performanceTestElement = loadingAnimationFactory({ type: 'shimmer' });

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const performanceTestPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Test your Performance here' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('performance-test', ['miscellaneous']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                ],
              }),
              gridFactory({
                items: [
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                ],
              }),
              gridFactory({
                items: [
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                ],
              }),
              gridFactory({
                items: [
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                ],
              }),
              gridFactory({
                items: [
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                ],
              }),
              gridFactory({
                items: [
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                ],
              }),
              gridFactory({
                items: [
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                ],
              }),
              gridFactory({
                items: [
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                ],
              }),
              gridFactory({
                items: [
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                  gridItemFactory({ size: 1, componentChildren: [performanceTestElement] }),
                ],
              }),
            ],
          },
          footer,
        }),
      ],
    }),
  ],
});
