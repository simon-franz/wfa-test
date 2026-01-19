import { mockComponents } from '@hrworks/cypress-utils/fixtures';
import { generateTest, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { VisibilityHandler } from './VisibilityHandler';
import type { VisibilityHandlerProps } from './VisibilityHandler.types';
import type { screenSizeMediaQueries } from '@hrworks/design-system/mediaQueries.ts';

const { Button } = mockComponents;
const selector = '[data-cy="cy-button"]';

type Breakpoint = keyof typeof screenSizeMediaQueries;

const renderVisibilityHandler = (props?: Partial<VisibilityHandlerProps>) => {
  renderComponentWithTheme(VisibilityHandler, {
    ...props,
    children: Button,
  });
};

type VisibilityArray = number[];

const generateVisibilityTests = (breakpoint: Breakpoint, visibleAt: VisibilityArray, sizes: VisibilityArray) => {
  sizes.forEach((size) => {
    const shouldBeVisible = visibleAt.includes(size);
    const visibility = shouldBeVisible ? 'visible' : 'not visible';

    generateTest(`${breakpoint} breakpoint at ${size}px`, `should be ${visibility}`, () => {
      renderVisibilityHandler({ visible: breakpoint });
      cy.viewport(size, 500);
      cy.get(selector).should(shouldBeVisible ? 'be.visible' : 'not.be.visible');
    });
  });
};

context('VisibilityHandler', () => {
  describe('Functional-Test', () => {
    generateTest('visible true', 'should display children when visible is true', () => {
      renderVisibilityHandler({ visible: true });
      cy.get(selector).should('be.visible');
    });

    generateTest('visible false', 'should hide children when visible is false', () => {
      renderVisibilityHandler({ visible: false });
      cy.get(selector).should('not.be.visible');
    });

    type BreakpointArray = ('xs' | 'sm' | 'md' | 'lg' | 'xl')[];

    const generateArrayVisibilityTests = (
      breakpoints: BreakpointArray,
      testCases: { viewport: number; shouldBeVisible: boolean }[],
    ) => {
      const arrayName = `["${breakpoints.join('","')}]`;
      testCases.forEach(({ viewport, shouldBeVisible }) => {
        const visibility = shouldBeVisible ? 'visible' : 'not visible';
        generateTest(`visible array ${arrayName} at ${viewport}px`, `should be ${visibility}`, () => {
          renderVisibilityHandler({ visible: breakpoints });
          cy.viewport(viewport, 500);
          cy.get(selector).should(shouldBeVisible ? 'be.visible' : 'not.be.visible');
        });
      });
    };

    generateArrayVisibilityTests(
      ['sm', 'lg'],
      [
        { viewport: 500, shouldBeVisible: false },
        { viewport: 640, shouldBeVisible: true },
        { viewport: 768, shouldBeVisible: false },
        { viewport: 1024, shouldBeVisible: true },
        { viewport: 1280, shouldBeVisible: false },
      ],
    );

    generateArrayVisibilityTests(
      ['xs', 'md', 'xl'],
      [
        { viewport: 500, shouldBeVisible: true },
        { viewport: 640, shouldBeVisible: false },
        { viewport: 768, shouldBeVisible: true },
        { viewport: 1024, shouldBeVisible: false },
        { viewport: 1280, shouldBeVisible: true },
      ],
    );
    generateArrayVisibilityTests(
      ['md'],
      [
        { viewport: 500, shouldBeVisible: false },
        { viewport: 640, shouldBeVisible: false },
        { viewport: 768, shouldBeVisible: true },
        { viewport: 1024, shouldBeVisible: false },
        { viewport: 1280, shouldBeVisible: false },
      ],
    );

    generateVisibilityTests('xs', [500, 639], [500, 639, 640]);
    generateVisibilityTests('sm', [640, 767], [639, 640, 767, 768]);
    generateVisibilityTests('md', [768, 1023], [767, 768, 1023, 1024]);
    generateVisibilityTests('lg', [1024, 1279], [1023, 1024, 1279, 1280]);
    generateVisibilityTests('xl', [1280, 1600], [1279, 1280, 1600]);
    generateVisibilityTests('>=xs', [0, 639, 800], [0, 639, 800]);
    generateVisibilityTests('>=sm', [640, 800], [639, 640, 800]);
    generateVisibilityTests('>=md', [768, 1100], [767, 768, 1100]);
    generateVisibilityTests('>=lg', [1024, 1400], [1023, 1024, 1400]);
    generateVisibilityTests('>=xl', [1280, 1400], [1279, 1280, 1400]);
    generateVisibilityTests('<=xs', [0, 639], [0, 639, 640]);
    generateVisibilityTests('<=sm', [500, 639, 640], [500, 639, 640, 800]);
    generateVisibilityTests('<=md', [500, 767, 768], [500, 767, 768, 1100]);
    generateVisibilityTests('<=lg', [500, 1023, 1024], [500, 1023, 1024, 1300]);
    generateVisibilityTests('<=xl', [500, 1279, 1280, 1400], [500, 1279, 1280, 1400]);
  });
});
