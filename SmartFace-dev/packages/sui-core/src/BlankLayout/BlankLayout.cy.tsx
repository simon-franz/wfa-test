import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { PageContext } from '../Page/PageContext';
import { BlankLayout } from './BlankLayout';
import type { BlankLayoutProps } from './BlankLayout.types';

const { BadgeFullHeight } = mockComponents;
const { boolean, pageContext, testStrings, testString, logos } = mockData;

const defaultProps: Partial<BlankLayoutProps> = {
  children: BadgeFullHeight,
};

const renderBlankLayout = (props?: Partial<BlankLayoutProps>) => {
  const WrappedComponent = (props: BlankLayoutProps) => (
    <PageContext.Provider value={pageContext}>
      <BlankLayout {...props} />
    </PageContext.Provider>
  );

  renderComponentWithTheme(WrappedComponent, { ...defaultProps, ...props });
  cy.viewport(1270, 790);
};

context('BlankLayout', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderBlankLayout,
      singleTests: {
        props: {
          borderless: boolean,
          children: testStrings,
          logo: logos,
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              children: testString,
            },
            config: {
              customScreenshotNames: { children: ['mobile'] },
              cb: () => {
                cy.viewport(500, 500);
              },
            },
          },
        ],
      },
    });
  });
});
