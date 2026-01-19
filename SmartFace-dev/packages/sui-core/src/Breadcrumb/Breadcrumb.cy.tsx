import { mockData } from '@hrworks/cypress-utils/fixtures';
import { generateTest, generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { Breadcrumb } from './Breadcrumb';
import type { BreadcrumbProps } from './Breadcrumb.types';
import { BreadcrumbItem } from './BreadcrumbItem/BreadcrumbItem';

const separatorOptions: BreadcrumbProps['separator'][] = ['arrow', 'slash', undefined];
const { overflowString, boolean, testURL, sizes } = mockData;

const defaultProps: Partial<BreadcrumbProps> = {
  children: (
    <>
      <BreadcrumbItem href={testURL}>First Crumb</BreadcrumbItem>
      <BreadcrumbItem href={testURL}>Second Crumb</BreadcrumbItem>
      <BreadcrumbItem>Last Crumb</BreadcrumbItem>
    </>
  ),
};

const renderBreadcrumb = (props?: Partial<BreadcrumbProps>) => {
  renderComponentWithTheme(Breadcrumb, { ...defaultProps, ...props });
};

context('Breadcrumb', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderBreadcrumb,
      singleTests: {
        props: {
          separator: separatorOptions,
          size: sizes,
          uppercase: boolean,
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              children: [
                <BreadcrumbItem key="single" href={testURL}>
                  Single Item
                </BreadcrumbItem>,

                <>
                  <BreadcrumbItem>Text Only</BreadcrumbItem>
                  <BreadcrumbItem href={testURL}>With Href</BreadcrumbItem>
                  <BreadcrumbItem onClick={() => {}}>With onClick</BreadcrumbItem>
                  <BreadcrumbItem href={testURL} onClick={() => {}}>
                    Both Href & onClick
                  </BreadcrumbItem>
                </>,

                <>
                  <BreadcrumbItem href={testURL} underline>
                    Underlined Link
                  </BreadcrumbItem>
                  <BreadcrumbItem underline>Underlined Text</BreadcrumbItem>
                </>,

                <>
                  <BreadcrumbItem href={testURL}>{overflowString}</BreadcrumbItem>
                  <BreadcrumbItem>{overflowString}</BreadcrumbItem>
                </>,

                <>
                  {Array.from({ length: 8 }, (_, i) => (
                    <BreadcrumbItem key={i} href={testURL}>
                      Item {i + 1}
                    </BreadcrumbItem>
                  ))}
                  <BreadcrumbItem>Final Item</BreadcrumbItem>
                </>,
              ],
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateTest('Breadcrumb: semantic structure', 'renders with correct semantic elements', () => {
      renderBreadcrumb();

      cy.get('nav[aria-label="breadcrumb"]').should('exist');
      cy.get('nav > ol').should('exist');
      cy.get('ol > li').should('have.length', 3);
    });
  });
});
