import { generateTest, generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { LoadingAnimation } from './LoadingAnimation';
import type { LoadingAnimationProps } from './LoadingAnimation.types';

const defaultProps: Partial<LoadingAnimationProps> = {
  type: 'shimmer',
  count: 3,
};

const counts = [1, 2, 3, 4, 5];

const generateMinMaxCombinations = () =>
  [0, 25, 50, 75, undefined].map((value) => {
    return {
      props: {
        minWidth: value,
        maxWidth: value,
      },
    };
  });

const renderLoadingAnimation = (props: Partial<LoadingAnimationProps>) => {
  renderComponentWithTheme(LoadingAnimation, { ...defaultProps, ...props });
};

context('LoadingAnimation', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderLoadingAnimation,
      singleTests: {
        props: {
          type: ['shimmer', 'spinner'],
          count: counts,
        },
      },
      combinationTests: {
        combinations: generateMinMaxCombinations(),
      },
    });
  });

  describe('Responsive- & Accessibility-Test', () => {
    generateTest('aria-label', 'is set correctly', () => {
      const ariaLabel = 'Test LoadingAnimation ARIA Label';
      renderLoadingAnimation({ 'aria-label': ariaLabel });
      cy.get('[data-cy="LoadingAnimation"]').should('have.attr', 'aria-label', ariaLabel);
    });
  });
});
