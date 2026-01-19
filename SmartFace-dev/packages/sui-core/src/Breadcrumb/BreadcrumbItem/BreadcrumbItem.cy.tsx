import { mockData } from '@hrworks/cypress-utils/fixtures';
import {
  generateFunctionalTests,
  generateTargetTests,
  generateTest,
  generateVisualTests,
  renderComponentWithTheme,
} from '@hrworks/cypress-utils/functions';

import { Breadcrumb } from '../Breadcrumb';
import { BreadcrumbItem } from './BreadcrumbItem';
import type { BreadcrumbItemProps } from './BreadcrumbItem.types';

const { testString, testStrings, boolean, testURL } = mockData;

const defaultProps: BreadcrumbItemProps = { children: testString };

const selector = '[data-cy="BreadcrumbItem"]';
const firstBreadcrumbItem = <BreadcrumbItem>{testString}</BreadcrumbItem>;
const lastBreadcrumbItem = <BreadcrumbItem>{testString}</BreadcrumbItem>;

const renderBreadcrumbItem = (props?: Partial<BreadcrumbItemProps>) => {
  renderComponentWithTheme(
    BreadcrumbItem,
    { ...defaultProps, ...props },
    { Wrapper: Breadcrumb, firstSibling: firstBreadcrumbItem, lastSibling: lastBreadcrumbItem },
  );
};

context('BreadcrumbItem', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderBreadcrumbItem,
      singleTests: {
        props: {
          children: testStrings,
          href: [testURL, undefined],
          underline: boolean,
        },
      },
      combinationTests: {
        combinations: [
          {
            props: { href: [testURL, undefined], onClick: [() => {}, undefined], underline: boolean },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateTest('href attribute', 'should have correct href attribute when provided', () => {
      renderBreadcrumbItem({ href: testURL });
      cy.get(`${selector} a`).should('have.attr', 'href', testURL);
    });

    generateFunctionalTests({
      renderFn: renderBreadcrumbItem,
      singleTests: generateTargetTests(`${selector} a`),
    });

    generateTest('onClick callback', 'onClick is called when item is clicked', () => {
      const onClickSpy = cy.spy().as('onClickSpy');
      renderBreadcrumbItem({
        onClick: onClickSpy,
      });

      cy.get(selector).click();
      cy.get('@onClickSpy').should('have.been.calledOnce');
    });
  });
});
