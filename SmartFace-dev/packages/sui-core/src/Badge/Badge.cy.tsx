import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { Badge } from './Badge';
import type { BadgeProps } from './Badge.types';

const { Icon, Input, Image } = mockComponents;
const { boolean, testStrings, corners, sizes, colors } = mockData;

const defaultProps: BadgeProps = {
  children: 'Badge Text',
};

const renderBadge = (props: Partial<BadgeProps>) => {
  renderComponentWithTheme(Badge, { ...defaultProps, ...props }, { checkForExistence: true });
};

context('Badge', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderBadge,
      singleTests: {
        props: {
          children: [testStrings, Icon],
          variant: ['filled', 'outlined'],
          corner: corners,
          size: sizes,
          color: colors,
          fullWidth: boolean,
          fixedSize: boolean,
          anchor: [Icon, Input, Image],
          dot: boolean,
        },
      },
    });
  });
});

describe('Functional-Test', () => {
  describe('Checking interactivity', () => {
    it('check stopPropagation', () => {
      const onBadgeClick = cy.spy().as('onBadgeClick');
      renderComponentWithTheme(
        Badge,
        {
          onClick: onBadgeClick,
        },
        {
          checkForExistence: true,
        },
      );
      cy.get('@onBadgeClick').should('not.have.been.called');
    });
  });
});
