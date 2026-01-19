import { mockData } from '@hrworks/cypress-utils/fixtures';
import { generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { DateField } from './DateField';
import type { DateFieldProps } from './DateField.types';
import { S as DatePickerCaptionStyles } from './DatePicker/DatePickerCaption.styles';

const { testString, sizes, validationStates, boolean, testStrings } = mockData;

const defaultProps: Partial<DateFieldProps> = {
  label: testString,
  placeholder: testString,
  helpText: testString,
  mandatory: true,
  validationMessage: testString,
};

const dates = ['1999-08-30', '9999-99-99', undefined] as const;

const renderDateField = (props?: Partial<DateFieldProps>) => {
  renderComponentWithTheme(DateField, { ...defaultProps, ...props });
};

context('DateField', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderDateField,
      singleTests: {
        props: {
          size: sizes,
          validationState: validationStates,
          mandatory: boolean,
          label: testStrings,
          placeholder: testStrings,
          helpText: testStrings,
          disabled: boolean,
          value: dates,
          defaultValue: dates,
          readOnly: boolean,
        },
      },
      combinationTests: {
        combinations: [
          { props: { value: dates[0], format: ['DDMMYYYY', 'MMDDYYYY'] } },
          {
            props: { value: dates[0] },
            config: {
              customScreenshotNames: { value: ['open-picker'] },
              cb: () => {
                cy.get('button').realClick();
                cy.get('[data-cy="icon-ready"]').should('have.length.at.least', 2);
              },
            },
          },
          {
            props: { value: dates[0] },
            config: {
              customScreenshotNames: { value: ['month-picker'] },
              cb: () => {
                cy.get('button').realClick();
                cy.contains('button', dates[0]?.split('-')[0]).click();
                cy.get('[data-cy="icon-ready"]').should('have.length.at.least', 2);
              },
            },
          },
          {
            props: { value: dates[0] },
            config: {
              customScreenshotNames: { value: ['year-picker'] },
              cb: () => {
                cy.get('button').realClick();
                cy.contains('button', dates[0]?.split('-')[0]).click();
                cy.contains('button', dates[0]?.split('-')[0]).click();
                cy.get('[data-cy="icon-ready"]').should('have.length.at.least', 2);
              },
            },
          },
          {
            props: { value: dates[0] },
            config: {
              customScreenshotNames: { value: ['navigate-views-inside-picker'] },
              cb: () => {
                cy.get('button').realClick();
                cy.contains('button', dates[0]?.split('-')[0]).click();
                cy.contains('button', dates[0]?.split('-')[0]).click();
                cy.contains('button', dates[0]?.split('-')[0]).click();
                cy.get('[data-cy="icon-ready"]').should('have.length.at.least', 2);
              },
            },
          },
          {
            props: { value: dates[0] },
            config: {
              customScreenshotNames: { value: ['previous-month'] },
              cb: () => {
                cy.get('button').realClick();
                cy.get(`${DatePickerCaptionStyles.Arrow}`).first().click();
                cy.get('[data-cy="icon-ready"]').should('have.length.at.least', 2);
              },
            },
          },
          {
            props: { value: dates[0] },
            config: {
              customScreenshotNames: { value: ['next-month'] },
              cb: () => {
                cy.get('button').realClick();
                cy.get(`${DatePickerCaptionStyles.Arrow}`).eq(1).click();
                cy.get('[data-cy="icon-ready"]').should('have.length.at.least', 2);
              },
            },
          },
        ],
      },
    });
  });

  // AI GENERATED FUNCTIONAL TESTS - NOT CONFIRMED IN EITHER FUNCTIONALITY OR USEFULNESS
  //   describe('Functional-Test', () => {
  //     generateFunctionalInputFieldTests(inputSelector, renderDateField as () => void);

  //     // DateField-specific functional tests
  //     generateTest('DatePickerToggle', 'opens DatePicker on click', () => {
  //       renderDateField({});
  //       cy.get(datePickerToggleSelector).click();
  //       cy.get(datePickerSelector).should('be.visible');
  //     });

  //     generateTest('DatePickerToggle', 'closes DatePicker on second click', () => {
  //       renderDateField({});
  //       cy.get(datePickerToggleSelector).click();
  //       cy.get(datePickerSelector).should('be.visible');
  //       cy.get(datePickerToggleSelector).click();
  //       cy.get(datePickerSelector).should('not.exist');
  //     });

  //     generateTest('DatePicker', 'selects a date and updates value', () => {
  //       const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
  //       renderDateField({ onValueChange: onValueChangeSpy });
  //       cy.get(datePickerToggleSelector).click();
  //       cy.get(datePickerSelector).should('be.visible');
  //       cy.get('[data-cy="DatePickerDay"]').first().click();
  //       cy.get('@onValueChangeSpy').should('have.been.called');
  //     });

  //     generateTest('DatePicker', 'closes after date selection', () => {
  //       renderDateField({});
  //       cy.get(datePickerToggleSelector).click();
  //       cy.get(datePickerSelector).should('be.visible');
  //       cy.get('[data-cy="DatePickerDay"]').first().click();
  //       cy.get(datePickerSelector).should('not.exist');
  //     });

  //     generateTest('disabled', 'prevents DatePicker from opening when disabled', () => {
  //       renderDateField({ disabled: true });
  //       cy.get(datePickerToggleSelector).should('be.disabled');
  //       cy.get(datePickerToggleSelector).click({ force: true });
  //       cy.get(datePickerSelector).should('not.exist');
  //     });

  //     generateTest('readOnly', 'prevents DatePicker from opening when readOnly', () => {
  //       renderDateField({ readOnly: true });
  //       cy.get(datePickerToggleSelector).click({ force: true });
  //       cy.get(datePickerSelector).should('not.exist');
  //     });

  //     generateTest('onValueChange', 'is called when typing a valid date', () => {
  //       const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
  //       renderDateField({ onValueChange: onValueChangeSpy });
  //       cy.get(inputSelector).type('15062024');
  //       cy.get('@onValueChangeSpy').should('have.been.called');
  //     });

  //     generateTest('onValueChangeFinished', 'is called on blur after value change', () => {
  //       const onValueChangeFinishedSpy = cy.spy().as('onValueChangeFinishedSpy');
  //       renderDateField({ onValueChangeFinished: onValueChangeFinishedSpy });
  //       cy.get(inputSelector).type('15062024').blur();
  //       cy.get('@onValueChangeFinishedSpy').should('have.been.calledOnce');
  //     });

  //     generateTest('minValue', 'prevents selection of dates before minValue', () => {
  //       renderDateField({ minValue: '2024-06-15', value: '2024-06-20' });
  //       cy.get(datePickerToggleSelector).click();
  //       cy.get('[data-cy="DatePickerDay"][data-disabled="true"]').should('exist');
  //     });

  //     generateTest('maxValue', 'prevents selection of dates after maxValue', () => {
  //       renderDateField({ maxValue: '2024-06-15', value: '2024-06-10' });
  //       cy.get(datePickerToggleSelector).click();
  //       cy.get('[data-cy="DatePickerDay"][data-disabled="true"]').should('exist');
  //     });

  //     generateTest('format DDMMYYYY', 'displays date in correct format', () => {
  //       renderDateField({ format: 'DDMMYYYY', value: '2024-06-15' });
  //       cy.get(inputSelector).should('have.value', '15.06.2024');
  //     });

  //     generateTest('format MMDDYYYY', 'displays date in correct format', () => {
  //       renderDateField({ format: 'MMDDYYYY', value: '2024-06-15' });
  //       cy.get(inputSelector).should('have.value', '06/15/2024');
  //     });

  //     generateTest('defaultValue', 'renders with defaultValue', () => {
  //       renderDateField({ defaultValue: '2024-01-15' });
  //       cy.get(inputSelector).should('not.have.value', '');
  //     });

  //     generateTest('value (controlled)', 'maintains controlled value', () => {
  //       renderDateField({ value: '2024-01-15' });
  //       cy.get(inputSelector).clear({ force: true }).blur();
  //       cy.get(inputSelector).should('have.value', '15.01.2024');
  //     });

  //     generateTest('undefined value', 'renders empty when value is undefined', () => {
  //       renderDateField({ value: undefined });
  //       cy.get(inputSelector).should('have.value', '');
  //     });
  //   });

  //   describe('Accessibility-Test', () => {
  //     generateTest('keyboard navigation', 'can be focused via Tab', () => {
  //       renderDateField({});
  //       cy.get('body').realPress('Tab');
  //       cy.get(inputSelector).should('be.focused');
  //     });

  //     generateTest('keyboard navigation', 'opens DatePicker with Enter on toggle', () => {
  //       renderDateField({});
  //       cy.get(datePickerToggleSelector).focus().type('{enter}');
  //       cy.get(datePickerSelector).should('be.visible');
  //     });

  //     generateTest('keyboard navigation', 'closes DatePicker with Escape', () => {
  //       renderDateField({});
  //       cy.get(datePickerToggleSelector).click();
  //       cy.get(datePickerSelector).should('be.visible');
  //       cy.get('body').type('{esc}');
  //       cy.get(datePickerSelector).should('not.exist');
  //     });

  //     generateTest('presentation', 'renders correctly with presentation prop', () => {
  //       const presentations = ['modal', 'dropdown'] as const;
  //       presentations.forEach((presentation) => {
  //         renderDateField({ presentation });
  //         cy.matchImageSnapshot(`presentation (${presentation})`);
  //       });
  //     });
  //   });
});
