export const addNotification = (message: string = 'Event triggered') =>
  ({
    type: 'request',
    data: {
      action: 'reflect',
      reflectedData: {
        sideEffects: [
          {
            type: 'addNotification',
            message,
          },
        ],
      },
    },
  } as const);
