import { mockData } from '@hrworks/cypress-utils/fixtures';
import {
  generateFocusVisibleTest,
  generateHrefTests,
  generateTest,
  generateVisualTests,
  renderComponentWithTheme,
} from '@hrworks/cypress-utils/functions';

import ListItem from './Item';
import { List } from './List';
import type { ListProps } from './List.types';

const { testStrings, testURL, testString, commonChildren } = mockData;
const testChildren = [...testStrings, ...commonChildren];

const defaultProps: ListProps = {
  children: [
    testChildren.map((child, index) => <ListItem key={index}>{child}</ListItem>),
    <ListItem key="selected" id="selected">
      {testString}
    </ListItem>,
  ],
};

const renderList = (props?: Partial<ListProps>) => {
  renderComponentWithTheme(List, { ...defaultProps, ...props });
};

context('List', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderList,
      singleTests: {
        props: {
          lineStyle: ['dashed', 'dotted', 'none', 'solid', undefined],
          selectedItemId: ['selected', undefined],
          // hoverable: boolean, TODO: Implement this test when Cypress supports hover-tests.
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              selectedItemId: ['selected', undefined],
            },
            config: {
              defaultProps: {
                children: [
                  <ListItem key="selected" id="selected" href={testURL}>
                    {testString}
                  </ListItem>,
                ],
              },
              cb: generateFocusVisibleTest,
              customScreenshotNames: { selectedItemId: ['selected-focus-visible', 'unselected-focus-visible'] },
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateHrefTests('item', () => {
      renderList({
        children: (
          <ListItem data-cy="item" href={testURL}>
            {testString}
          </ListItem>
        ),
      });
    });

    // TODO: If we decidce that item-elements need their own test - we could make use of the target-test-generator. Its currently not possible without creating a renderListItem function.
    generateTest('List', 'should have correct href and target-attributes', () => {
      ['_blank', '_self', '_parent', '_top'].forEach((target, index) => {
        renderList({
          children: (
            <ListItem key={index} href={testURL} target={target} data-cy={`list-${target}`}>
              {testString}
            </ListItem>
          ),
        });
        cy.get(`[data-cy="list-${target}"] a`).should('have.attr', 'href', testURL);
        cy.get(`[data-cy="list-${target}"] a`).should('have.attr', 'target', target);
      });
    });
  });
});
