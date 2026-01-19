import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateTest, generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '../Card';
import type { CardProps } from '../Card/Card.types';

const { testString, testStrings, boolean } = mockData;
const { Button, Badge, Icon } = mockComponents;

const CardTitleComponent = <CardTitle>{testString}</CardTitle>;
const CardBodyComponent = <CardBody>{testStrings[1]}</CardBody>;
const CardFooterComponent = <CardFooter>{Button}</CardFooter>;
const CardHeaderComponent = <CardHeader>{CardTitleComponent}</CardHeader>;

const cardWithHeaderIcon = (
  <>
    <CardHeader>
      <CardTitle icon={Icon}>{testString}</CardTitle>
    </CardHeader>
    {CardBodyComponent}
  </>
);

const cardWithToolbarChildren = (
  <>
    <CardHeader>
      {CardTitleComponent}
      {[Badge, Badge, Badge]}
    </CardHeader>
    {CardBodyComponent}
  </>
);

const cardWithFooter = (
  <>
    {CardHeaderComponent}
    {CardBodyComponent}
    {CardFooterComponent}
  </>
);

const cardWithAllVisualProps = (
  <>
    <CardHeader>
      <CardTitle icon={Icon} subtitle={testStrings[0]}>
        {testString}
      </CardTitle>
      {[Badge, Badge, Badge]}
    </CardHeader>
    {CardBodyComponent}
    {CardFooterComponent}
  </>
);

const cardChildren = [cardWithHeaderIcon, cardWithToolbarChildren, cardWithFooter, cardWithAllVisualProps];

const defaultProps: Partial<CardProps> = {
  children: (
    <>
      {CardHeaderComponent}
      {CardBodyComponent}
    </>
  ),
};

const renderCard = (props: Partial<CardProps>) => {
  renderComponentWithTheme(Card, { ...defaultProps, ...props }, undefined);
};

context('Card', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderCard,
      singleTests: {
        props: {
          fullHeight: boolean,
          children: cardChildren,
        },
        config: {
          customScreenshotNames: {
            children: ['cardWithHeaderIcon', 'cardWithToolbarChildren', 'cardWithFooter', 'cardWithAllVisualProps'],
          },
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              fullHeight: boolean,
              children: cardChildren,
            },
            config: {
              customScreenshotNames: {
                children: ['cardWithHeaderIcon', 'cardWithToolbarChildren', 'cardWithFooter', 'cardWithAllVisualProps'],
              },
            },
          },
        ],
      },
    });
  });
});

describe('Functional-Test', () => {
  generateTest('onClick', 'is called once', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    renderCard({ onClick: onClickSpy });
    cy.get('[data-cy="Card"]').click().get('@onClickSpy').should('have.been.calledOnce');
  });
});
