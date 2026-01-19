import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { BlockUI } from '../BlockUI';
import type { BlockUIProps } from './BlockUI.types';

const { boolean } = mockData;
const { Button } = mockComponents;

const renderBlockUI = (props: Partial<BlockUIProps>) => {
  renderComponentWithTheme(BlockUI, props, { firstSibling: Button, checkForExistence: props.isOpen });
};

context('BlockUI', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderBlockUI,
      singleTests: {
        props: {
          isOpen: boolean,
        },
      },
    });
  });

  describe('Functional-Test', () => {
    describe('isOpen', () => {
      it('true: other Elements should not be clickable', (done) => {
        renderBlockUI({ isOpen: true });
        cy.get('button').shouldNotBeActionable(done);
      });

      it('false: other Elements should be clickable', () => {
        renderBlockUI({ isOpen: false });
        cy.get('button').click();
      });
    });
  });
});
