export default (body) => {
  const { targetId: id, pageEvent = {} } = body.backendEventData;

  return {
    sideEffects: [
      {
        type: 'navigateToElement',
        id: id,
        ...pageEvent,
      },
    ],
  };
};
