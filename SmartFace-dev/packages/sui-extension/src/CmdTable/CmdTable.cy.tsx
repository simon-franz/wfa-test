import { mockData } from '@hrworks/cypress-utils/fixtures';
import {
  generateFocusVisibleTest,
  generateHrefTests,
  generateTest,
  generateVisualTests,
  renderComponentWithTheme,
} from '@hrworks/cypress-utils/functions';

import { CmdTable, CmdTableItem, type CmdTableItemProps, type CmdTableProps } from './';

const { testString, testURL, boolean, overflowString } = mockData;

const createItems = (title: string) => [
  { title, url: testURL, confirmed: boolean[1] },
  { title, url: '', confirmed: boolean[1] },
  { title, url: testURL, confirmed: boolean[1], signingUrl: testURL },
  { title, url: testURL, confirmed: boolean[0] },
];

const cmdTableItemProps: CmdTableItemProps[] = [...createItems(testString), ...createItems(overflowString)];
const cmdTableItems = cmdTableItemProps.map((props, index) => <CmdTableItem key={index} {...props} />);
const confirmedDocumentsCount = cmdTableItemProps.filter((item) => item.confirmed).length;

const defaultProps: Partial<CmdTableProps> = {
  documentsCount: 1,
  confirmedDocumentsCount,
  children: cmdTableItems,
};

const renderCmdTable = (props: Partial<CmdTableProps>) => {
  renderComponentWithTheme(CmdTable, { ...defaultProps, ...props });
};

context('CmdTable', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderCmdTable,
      singleTests: {
        props: {
          children: cmdTableItems,
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              children: [cmdTableItems],
            },
            config: {
              cb: generateFocusVisibleTest,
              defaultProps: {
                documentsCount: cmdTableItems.length,
                confirmedDocumentsCount: confirmedDocumentsCount,
              },
              customScreenshotNames: { children: ['focusVisibleTest'] },
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateTest('onClick', 'is called', () => {
      const onClickSpy = cy.spy().as('onClickSpy');
      renderCmdTable({ onClick: onClickSpy });
      cy.get('button').first().click();
      cy.get('@onClickSpy').should('have.been.calledOnce');
    });

    generateHrefTests('item', () => {
      renderCmdTable({
        children: (
          <CmdTableItem title={testString} data-cy="item" url={testURL}>
            {testString}
          </CmdTableItem>
        ),
      });
    });
  });
});
