import { mockData } from '@hrworks/cypress-utils/fixtures';
import { generateTest, generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { NestedChecklist } from './NestedChecklist';
import type { NestedChecklistProps } from './NestedChecklist.types';
import { NestedChecklistEntry } from './NestedChecklistEntry';
import { S as NestedChecklistEntryStyles } from './NestedChecklistEntry/NestedChecklistEntry.styles';

const { testStrings, overflowString, sizes } = mockData;

const defaultProps: Partial<NestedChecklistProps> = {
  children: [
    <NestedChecklistEntry
      id="0"
      key="0"
      label="Parent 0"
      checked={false}
      expanded={false}
      checkDescendantsOnFetchEntries={false}
    >
      <>
        <NestedChecklistEntry
          id="1"
          key="1"
          label="Parent 1"
          checked={false}
          expanded={true}
          checkDescendantsOnFetchEntries={false}
        />
        <NestedChecklistEntry
          id="2"
          key="2"
          label="Parent 2"
          checked={false}
          expanded={false}
          checkDescendantsOnFetchEntries={false}
        />
        <NestedChecklistEntry
          id="3"
          key="3"
          label="Parent 3"
          checked={false}
          expanded={false}
          checkDescendantsOnFetchEntries={false}
        />
        <NestedChecklistEntry
          id="4"
          key="4"
          label="Parent 4"
          checked={false}
          expanded={false}
          checkDescendantsOnFetchEntries={false}
        />
      </>
    </NestedChecklistEntry>,

    <NestedChecklistEntry
      id="2"
      key="2"
      label="Parent 2"
      checked={false}
      expanded={false}
      checkDescendantsOnFetchEntries={false}
    />,
  ],
};

const testEntries: NestedChecklistProps['children'][] = [
  [
    <NestedChecklistEntry
      id="single"
      key="single"
      label="Single Parent Entry (Collapsed)"
      checked={false}
      expanded={false}
      checkDescendantsOnFetchEntries={false}
    >
      <NestedChecklistEntry
        id="single-child"
        key="single-child"
        label="Single Child Entry"
        checked={false}
        expanded={false}
        checkDescendantsOnFetchEntries={false}
      />
    </NestedChecklistEntry>,
  ],
  [
    <NestedChecklistEntry
      id="single-expanded"
      key="single-expanded"
      label="Single Parent Entry (Expanded)"
      checked={false}
      expanded
      checkDescendantsOnFetchEntries={false}
    >
      <NestedChecklistEntry
        id="single-child-expanded"
        key="single-child-expanded"
        label="Single Child Entry"
        checked={false}
        expanded={false}
        checkDescendantsOnFetchEntries={false}
      />
    </NestedChecklistEntry>,
  ],

  [
    <NestedChecklistEntry
      id={`${testStrings[2]}`}
      key={`${testStrings[2]}`}
      label={`${overflowString}`}
      checked
      expanded
      checkDescendantsOnFetchEntries={false}
    >
      <NestedChecklistEntry
        id="long-label-child"
        key="long-label-child"
        label="Child eines Parent mit langem Label"
        checked
        expanded={false}
        checkDescendantsOnFetchEntries={false}
      />
    </NestedChecklistEntry>,
  ],
];

const renderNestedChecklist = (props: Partial<NestedChecklistProps>) => {
  renderComponentWithTheme(NestedChecklist, { ...defaultProps, ...props });
};

context('NestedChecklist', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderNestedChecklist,
      singleTests: {
        props: {
          size: sizes,
          children: testEntries,
        },
        config: {
          defaultProps,
          customScreenshotNames: {
            children: [
              'Default entries',
              'Parent with child (collapsed)',
              'Parent with child (expanded)',
              'Long label with nested item',
            ],
          },
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              size: sizes,
              children: testEntries,
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateTest('checkbox click', 'triggers onCheckedChange', () => {
      const onCheckedChange = cy.spy().as('onCheckedChange');
      renderNestedChecklist({
        children: [
          <NestedChecklistEntry
            id="single"
            key="single"
            label="Single Parent Entry"
            checked={false}
            expanded={false}
            checkDescendantsOnFetchEntries={false}
            onCheckedChange={onCheckedChange}
            data-guide-id="parent-entry-1"
          >
            <NestedChecklistEntry
              id="single-child"
              key="single-child"
              label="Single Child Entry"
              checked={false}
              expanded={false}
              checkDescendantsOnFetchEntries={false}
            />
          </NestedChecklistEntry>,
        ],
      });
      cy.get(`${NestedChecklistEntryStyles.Checkbox}`).click();
      cy.get('@onCheckedChange').should('have.been.calledOnce');
    });

    generateTest('arrow click', 'triggers onExpandedChange', () => {
      const onExpandedChange = cy.spy().as('onExpandedChange');
      renderNestedChecklist({
        children: [
          <NestedChecklistEntry
            id="single"
            key="single"
            label="Single Parent Entry"
            checked={false}
            expanded={false}
            checkDescendantsOnFetchEntries={false}
            onExpandedChange={onExpandedChange}
            data-guide-id="parent-entry-1"
          >
            <NestedChecklistEntry
              id="single-child"
              key="single-child"
              label="Single Child Entry"
              checked={false}
              expanded={false}
              checkDescendantsOnFetchEntries={false}
            />
          </NestedChecklistEntry>,
        ],
      });
      cy.get(`${NestedChecklistEntryStyles.GridContainer}`).find(`${NestedChecklistEntryStyles.ArrowArea}`).click();
      cy.get('@onExpandedChange').should('have.been.calledOnce');
    });

    generateTest('initial render', 'triggers onFetchEntries', () => {
      const onFetchEntries = cy.stub().resolves();
      cy.wrap(onFetchEntries).as('onFetchEntries');
      renderNestedChecklist({
        onFetchEntries: onFetchEntries,
        children: [
          <NestedChecklistEntry
            id="single"
            key="single"
            label="Single Parent Entry"
            checked={false}
            expanded={false}
            checkDescendantsOnFetchEntries={false}
            data-guide-id="parent-entry-1"
          >
            <NestedChecklistEntry
              id="single-child"
              key="single-child"
              label="Single Child Entry"
              checked={false}
              expanded={false}
              checkDescendantsOnFetchEntries={false}
            />
          </NestedChecklistEntry>,
        ],
      });
      cy.get('@onFetchEntries').should('have.been.calledOnce');
    });

    generateTest('select all toggle click', 'triggers onCheckAllRecursively', () => {
      const onCheckAllRecursively = cy.stub().as('onCheckAllRecursively');
      renderNestedChecklist({
        children: [
          <NestedChecklistEntry
            id="single"
            key="single"
            label="Single Parent Entry"
            checked={false}
            expanded
            checkDescendantsOnFetchEntries={false}
            data-guide-id="parent-entry-1"
            onCheckAllRecursively={onCheckAllRecursively}
          >
            <NestedChecklistEntry
              id="single-child"
              key="single-child"
              label="Single Child Entry"
              checked={false}
              expanded={false}
              checkDescendantsOnFetchEntries={false}
            />
          </NestedChecklistEntry>,
        ],
      });

      cy.get(`${NestedChecklistEntryStyles.GridContainer}`)
        .find(`${NestedChecklistEntryStyles.SelectAllToggle}`)
        .click({ force: true });
      cy.get('@onCheckAllRecursively').should('have.been.calledOnce');
    });

    generateTest('selectAllArea click', 'triggers onCheckAllRecursively', () => {
      const onCheckAllRecursively = cy.spy().as('onCheckAllRecursively');
      renderNestedChecklist({
        children: [
          <NestedChecklistEntry
            id="single"
            key="single"
            label="Single Parent Entry"
            checked={false}
            expanded={false}
            checkDescendantsOnFetchEntries={false}
            onCheckAllRecursively={onCheckAllRecursively}
            data-guide-id="parent-entry-1"
          >
            <NestedChecklistEntry
              id="single-child"
              key="single-child"
              label="Single Child Entry"
              checked={false}
              expanded={false}
              checkDescendantsOnFetchEntries={false}
            />
          </NestedChecklistEntry>,
        ],
      });
      cy.get(`${NestedChecklistEntryStyles.SelectAllArea}`).click();
      cy.get('@onCheckAllRecursively').should('have.been.calledOnce');
    });

    generateTest('expanding parent', 'triggers checkDescendantsOnFetchEntries', () => {
      const onFetchEntries = cy.stub().resolves([{ id: 'fetched-child', label: 'Fetched Child', checked: false }]);
      cy.wrap(onFetchEntries).as('onFetchEntries');

      renderNestedChecklist({
        children: [
          <NestedChecklistEntry
            id="single"
            key="single"
            label="Single Parent Entry"
            checked
            expanded={false}
            checkDescendantsOnFetchEntries
            onFetchEntries={onFetchEntries}
            data-guide-id="parent-entry-1"
          >
            <NestedChecklistEntry
              id="single-child"
              key="single-child"
              label="Single Child Entry"
              checked={false}
              expanded={false}
              checkDescendantsOnFetchEntries={false}
              data-guide-id="child-entry-2"
            />
          </NestedChecklistEntry>,
        ],
      });
      cy.get(`${NestedChecklistEntryStyles.GridContainer}`).should('exist');
      cy.get(`${NestedChecklistEntryStyles.ArrowArea}`).first().click();
      cy.get('@onFetchEntries').should('have.been.calledOnce');
    });
  });
});
