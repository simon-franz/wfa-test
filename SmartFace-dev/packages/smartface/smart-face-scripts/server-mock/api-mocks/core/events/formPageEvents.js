import { patchFactory } from '../../shared/patchFactory.js';

export default (body) => {
  const { targetId: id, pageEvent: event } = body.backendEventData;

  switch (event) {
    case 'on-value-change':
      return {
        sideEffects: [
          {
            type: 'javaScriptExecutor',
            javaScript: `function() { console.log("Component '${id}' changed") }`,
          },
        ],
      };
    case 'add-value-to-select':
      return patchFactory([
        {
          targetSfId: 'select-0',
          operation: 'write',
          path: 'props.value',
          value: 'option-2',
        },
      ]);
    case 'on-enter-key-down':
      return {
        sideEffects: [
          {
            type: 'javaScriptExecutor',
            javaScript: `function() { console.log("Component '${id}' changed by pressing enter") }`,
          },
        ],
      };
    case 'reset-form':
      return patchFactory([
        {
          targetSfId: 'text-field-0',
          operation: 'write',
          path: 'props.value',
          value: 'Daisy',
        },
        {
          targetSfId: 'text-field-1',
          operation: 'write',
          path: 'props.value',
          value: 'Duck',
        },
        {
          targetSfId: 'integer-field-0',
          operation: 'write',
          path: 'props.value',
          value: '',
        },
        {
          targetSfId: 'decimal-field-0',
          operation: 'write',
          path: 'props.value',
          value: '42.42',
        },
        {
          targetSfId: 'decimal-field-1',
          operation: 'write',
          path: 'props.value',
          value: '',
        },
        {
          targetSfId: 'decimal-field-2',
          operation: 'write',
          path: 'props.value',
          value: '',
        },
      ]);

    default:
      return {};
  }
};
