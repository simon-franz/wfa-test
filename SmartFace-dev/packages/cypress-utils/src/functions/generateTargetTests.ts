import { mockData } from '../fixtures/mockData';

const { testURL } = mockData;

export const generateTargetTests = (selector: string) => ({
  props: {
    target: ['_blank', '_self', '_parent', '_top'],
  },
  config: {
    defaultProps: { href: testURL },
    cb: (testedPropValue: string) => {
      cy.get(selector).should('have.attr', 'target', testedPropValue);
    },
  },
});
