import { mockData } from '@hrworks/cypress-utils/fixtures';
import {
  generateFocusVisibleTest,
  generateTest,
  generateVisualTests,
  renderComponentWithTheme,
} from '@hrworks/cypress-utils/functions';

import Slider from '../Slider';
import type { SliderProps } from '../Slider/Slider.types';

const { colors, boolean } = mockData;

const selectors = {
  container: '[data-cy="Slider"]',
  handle: '[data-cy="Slider"] [role="slider"]',
  track: '[data-cy="Slider"] .rc-slider-track',
  slider: '[data-cy="Slider"] .rc-slider',
};

const defaultProps: Partial<SliderProps> = {
  value: 50,
};

const renderSlider = (props: Partial<SliderProps>) => {
  renderComponentWithTheme(Slider, { ...defaultProps, ...props }, { checkForExistence: true });
};

context('Slider', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderSlider,
      singleTests: {
        props: {
          value: [0, 25, 50, 75, 100],
          color: colors,
          showTrack: boolean,
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              min: [20],
              max: [80],
              value: [35, 65],
            },
          },
          {
            props: {
              value: [50],
              color: [undefined, 'danger'],
            },
            config: {
              cb: generateFocusVisibleTest,
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    describe('value constraints', () => {
      it('are enforced when setting a value via keyboard controls', () => {
        const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
        const onValueChangeFinishedSpy = cy.spy().as('onValueChangeFinishedSpy');
        renderSlider({
          min: 20,
          max: 80,
          onValueChange: onValueChangeSpy,
          onValueChangeFinished: onValueChangeFinishedSpy,
        });
        cy.get(selectors.handle).focus().type('{home}').realPress('Tab');
        cy.get(selectors.handle).should('have.attr', 'aria-valuenow', '20');
        cy.get('@onValueChangeSpy').should('have.been.called');
        cy.get('@onValueChangeSpy').should('have.been.calledWith', 20);
        cy.get('@onValueChangeFinishedSpy').should('have.been.called');

        cy.get(selectors.handle).type('{leftarrow}{leftarrow}');
        cy.get(selectors.handle).should('have.attr', 'aria-valuenow', '20');
        cy.get('@onValueChangeSpy').should('have.been.called');
        cy.get('@onValueChangeSpy').should('have.been.calledWith', 20);
        cy.get('@onValueChangeFinishedSpy').should('have.been.called');

        cy.get(selectors.handle).type('{end}').realPress('Tab');
        cy.get(selectors.handle).should('have.attr', 'aria-valuenow', '80');
        cy.get('@onValueChangeSpy').should('have.been.called');
        cy.get('@onValueChangeSpy').should('have.been.calledWith', 80);
        cy.get('@onValueChangeFinishedSpy').should('have.been.called');

        cy.get(selectors.handle).type('{rightarrow}{rightarrow}');
        cy.get(selectors.handle).should('have.attr', 'aria-valuenow', '80');
        cy.get('@onValueChangeSpy').should('have.been.called');
        cy.get('@onValueChangeSpy').should('have.been.calledWith', 80);
        cy.get('@onValueChangeFinishedSpy').should('have.been.called');
      });

      it('are enforced when setting a value via mouse controls', () => {
        const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
        const onValueChangeFinishedSpy = cy.spy().as('onValueChangeFinishedSpy');
        renderSlider({
          min: 20,
          max: 80,
          onValueChange: onValueChangeSpy,
          onValueChangeFinished: onValueChangeFinishedSpy,
        });
        cy.get(selectors.container).click('left');
        cy.get(selectors.handle).should('have.attr', 'aria-valuenow', '20');
        cy.get('@onValueChangeSpy').should('have.been.called');
        cy.get('@onValueChangeSpy').should('have.been.calledWith', 20);
        cy.get('@onValueChangeFinishedSpy').should('have.been.called');

        cy.get(selectors.container).click('right');
        cy.get(selectors.handle).should('have.attr', 'aria-valuenow', '80');
        cy.get('@onValueChangeSpy').should('have.been.called');
        cy.get('@onValueChangeSpy').should('have.been.calledWith', 80);
        cy.get('@onValueChangeFinishedSpy').should('have.been.called');
      });

      generateTest('minimum value enforcement', 'corrects values to minimum when set below the allowed range', () => {
        const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
        const onValueChangeFinishedSpy = cy.spy().as('onValueChangeFinishedSpy');
        renderSlider({
          min: 20,
          value: 10,
          onValueChange: onValueChangeSpy,
          onValueChangeFinished: onValueChangeFinishedSpy,
        });
        cy.get(selectors.handle).should('have.attr', 'aria-valuenow', '20');
        cy.get('@onValueChangeSpy').should('not.have.been.called');
        cy.get('@onValueChangeFinishedSpy').should('not.have.been.called');
      });

      generateTest('maximum value enforcement', 'corrects values to maximum when set above the allowed range', () => {
        const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
        const onValueChangeFinishedSpy = cy.spy().as('onValueChangeFinishedSpy');
        renderSlider({
          max: 80,
          value: 90,
          onValueChange: onValueChangeSpy,
          onValueChangeFinished: onValueChangeFinishedSpy,
        });
        cy.get(selectors.handle).should('have.attr', 'aria-valuenow', '80');
        cy.get('@onValueChangeSpy').should('not.have.been.called');
        cy.get('@onValueChangeFinishedSpy').should('not.have.been.called');
      });
    });

    describe('step incrementation', () => {
      it('adjusts values according to configured step size during keyboard and mouse interaction', () => {
        const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
        const onValueChangeFinishedSpy = cy.spy().as('onValueChangeFinishedSpy');
        renderSlider({
          step: 10,
          value: 50,
          onValueChange: onValueChangeSpy,
          onValueChangeFinished: onValueChangeFinishedSpy,
        });
        cy.get(selectors.handle).should('have.attr', 'aria-valuenow', '50');

        cy.get(selectors.handle).focus().type('{rightarrow}').realPress('Tab');
        cy.get(selectors.handle).should('have.attr', 'aria-valuenow', '60');
        cy.get('@onValueChangeSpy').should('have.been.called');
        cy.get('@onValueChangeSpy').should('have.been.calledWith', 60);
        cy.get('@onValueChangeFinishedSpy').should('have.been.called');

        cy.get(selectors.handle).type('{rightarrow}');
        cy.get(selectors.handle).should('have.attr', 'aria-valuenow', '70');
        cy.get('@onValueChangeSpy').should('have.been.called');
        cy.get('@onValueChangeSpy').should('have.been.calledWith', 70);
        cy.get('@onValueChangeFinishedSpy').should('have.been.called');

        cy.get(selectors.handle).type('{leftarrow}');
        cy.get(selectors.handle).should('have.attr', 'aria-valuenow', '60');
        cy.get('@onValueChangeSpy').should('have.been.called');
        cy.get('@onValueChangeSpy').should('have.been.calledWith', 60);
        cy.get('@onValueChangeFinishedSpy').should('have.been.called');

        cy.get(selectors.container).click('left');
        cy.get(selectors.handle).should('have.attr', 'aria-valuenow', '0');
        cy.get('@onValueChangeSpy').should('have.been.called');
        cy.get('@onValueChangeSpy').should('have.been.calledWith', 0);
        cy.get('@onValueChangeFinishedSpy').should('have.been.called');

        cy.get(selectors.container).click('center');
        cy.get(selectors.handle).should('have.attr', 'aria-valuenow', '50');
        cy.get('@onValueChangeSpy').should('have.been.called');
        cy.get('@onValueChangeSpy').should('have.been.calledWith', 50);
        cy.get('@onValueChangeFinishedSpy').should('have.been.called');

        cy.get(selectors.container).click('right');
        cy.get(selectors.handle).should('have.attr', 'aria-valuenow', '100');
        cy.get('@onValueChangeSpy').should('have.been.called');
        cy.get('@onValueChangeSpy').should('have.been.calledWith', 100);
        cy.get('@onValueChangeFinishedSpy').should('have.been.called');
      });
    });

    describe('event callbacks', () => {
      it('calls events with the correct value when changing the value via keyboard controls', () => {
        const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
        const onValueChangeFinishedSpy = cy.spy().as('onValueChangeFinishedSpy');
        renderSlider({
          onValueChange: onValueChangeSpy,
          onValueChangeFinished: onValueChangeFinishedSpy,
        });
        cy.get(selectors.handle).focus().type('{rightarrow}').realPress('Tab');
        cy.get('@onValueChangeSpy').should('have.been.calledOnce');
        cy.get('@onValueChangeSpy').should('have.been.calledWith', 51);
        cy.get('@onValueChangeFinishedSpy').should('have.been.calledOnce');
        cy.get(selectors.handle).should('have.attr', 'aria-valuenow', '51');
      });
      it('triggers onValueChange with mouse interaction and sets expected value', () => {
        const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
        const onValueChangeFinishedSpy = cy.spy().as('onValueChangeFinishedSpy');
        renderSlider({
          onValueChange: onValueChangeSpy,
          onValueChangeFinished: onValueChangeFinishedSpy,
        });
        cy.get(selectors.container).click('right');
        cy.get('@onValueChangeSpy').should('have.been.calledOnce');
        cy.get('@onValueChangeSpy').invoke('getCall', 0).its('args.0').should('be.within', 90, 100);
        cy.get('@onValueChangeFinishedSpy').should('have.been.calledOnce');
        cy.get(selectors.handle).invoke('attr', 'aria-valuenow').then(Number).should('be.within', 90, 100);
      });
    });
  });

  describe('Responsive- & Accessibility-Test', () => {
    it('provides correct ARIA attributes for value range and current position', () => {
      renderSlider({ min: 0, max: 100, value: 50 });
      cy.get(selectors.handle).should('have.attr', 'aria-valuemin', '0');
      cy.get(selectors.handle).should('have.attr', 'aria-valuemax', '100');
      cy.get(selectors.handle).should('have.attr', 'aria-valuenow', '50');
    });
  });
});
