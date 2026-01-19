import { mockComponents } from '@hrworks/cypress-utils/fixtures';
import { generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { Form } from './Form';
import type { FormProps } from './Form.types';

const { Badge, BadgeFullHeight } = mockComponents;

const defaultProps = {
  id: 'FormId',
  children: Badge,
};

const renderForm = (props: Partial<FormProps>) => {
  renderComponentWithTheme(Form, { ...defaultProps, ...props }, { checkForExistence: true });
};

context('Form', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderForm,
      singleTests: {
        props: {
          children: [Badge, BadgeFullHeight],
        },
        config: {
          defaultProps: { id: 'FormId', fullHeight: true },
        },
      },
    });
  });

  describe('Functional-Test', () => {
    describe('Properties', () => {
      it('has attribute data-smart-face-id', () => {
        renderForm({ children: Badge });
        cy.get('[data-cy="Form"]').should('have.attr', 'data-smart-face-id').and('equal', 'FormId');
      });

      it('calls the onSubmit event', () => {
        const onSubmitSpy = cy.spy().as('onSubmitSpy');
        renderForm({
          onSubmit: (e) => {
            e.preventDefault();
            onSubmitSpy();
          },
          children: Badge,
        });
        cy.get('[data-cy="Form"]').submit();
        cy.get('@onSubmitSpy').should('have.been.called');
      });
    });
  });
});
