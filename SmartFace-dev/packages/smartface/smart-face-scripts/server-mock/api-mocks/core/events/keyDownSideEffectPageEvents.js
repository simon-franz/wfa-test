import { patchFactory } from '../../shared/patchFactory.js';

export default (body) => {
  const { pageEvent: event } = body.backendEventData;

  switch (event) {
    case 'deactivate':
      return patchFactory([{ targetSfId: 'key-down-0', operation: 'delete', path: null }]);
    case 'modify-ctrlKey-x':
      return patchFactory([
        { targetSfId: 'key-down-0', operation: 'write', path: 'props.shortcut', value: { key: 'x', ctrlKey: true } },
      ]);
    case 'modify-altKey-x':
      return patchFactory([
        { targetSfId: 'key-down-0', operation: 'write', path: 'props.shortcut', value: { key: 'x', altKey: true } },
      ]);
    case 'modify-ctrlKey-altKey-x':
      return patchFactory([
        {
          targetSfId: 'key-down-0',
          operation: 'write',
          path: 'props.shortcut',
          value: { key: 'x', ctrlKey: true, altKey: true },
        },
      ]);
    case 'update-sfEvent':
      return patchFactory([
        {
          targetSfId: 'key-down-0',
          operation: 'write',
          path: 'props.onKeyDown',
          value: [],
        },
      ]);

    default:
      return {};
  }
};
