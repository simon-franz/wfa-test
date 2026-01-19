// @ts-check

import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { timeFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/timeFieldFactory.js';

const timeFieldProps = {
  presentation: 'modal',
  name: 'time-0',
  label: 'What time is it?',
  mandatory: true,
  helpText: 'Helptext',
  placeholder: 'Placeholder',
  timePickerToggleIcon: {
    sfComponent: 'FontAwesomeIcon',
    sfId: 'time-icon-0',
    props: { name: 'clock' },
  },
  onValueChange: [
    {
      type: 'request',
      blockUi: false,
      data: {
        action: 'form-page',
        targetId: 'time-field-0',
        pageEvent: 'on-value-change',
      },
    },
  ],
  onEnterKeyDown: [
    {
      type: 'request',
      blockUi: false,
      data: {
        action: 'form-page',
        targetId: 'time-field-0',
        pageEvent: 'on-enter-key-down',
      },
    },
  ],
};

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const timeFieldPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      componentChildren: [
        classicLayoutFactory({
          content: {
            componentChildren: [
              timeFieldFactory({ ...timeFieldProps }, 'time-field-0', 'data-guide-test'),
              timeFieldFactory({ ...timeFieldProps, presentation: 'dropdown' }, 'time-field-1', 'data-guide-test'),
            ],
          },
        }),
      ],
    }),
  ],
});
