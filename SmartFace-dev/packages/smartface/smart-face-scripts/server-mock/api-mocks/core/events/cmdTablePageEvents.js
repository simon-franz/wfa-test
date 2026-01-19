import { patchFactory } from '../../shared/patchFactory.js';

export default (body) => {
  const { pageEvent: id, customString } = body.backendEventData;

  return patchFactory(
    [{ operation: 'write', targetSfId: id, path: 'props.confirmed', value: true }],
    [
      {
        type: 'addNotification',
        stack: true,
        message: customString || '>>> Document-Confirmed <<<',
        color: 'primary',
      },
    ],
  );
};
