export const workingTimesResponses = {
  success: {
    result: {
      beginDateAndTime: '2025-08-14T08:59:03.959Z',
      endDateAndTime: '2025-08-14T08:59:03.959Z',
      clockInKioskId: 0,
      clockOutKioskId: 0,
      comment: 'string',
      workingTimeType: {
        name: 'string',
        type: 'workingTime',
      },
      project: {
        name: 'string',
        id: 'string',
        number: 0,
      },
      id: '1_1683093600',
    },
    warnings: [
      {
        warningNumber: 0,
        warningMessage: 'string',
      },
    ],
  },

  error: {
    errorCode: 0,
    type: 'string',
    errorMessage: 'string',
    additionalErrors: ['string'],
  },
};

export const workingTimesErrors = {
  invalidFormat: {
    errorCode: 1,
    errorMessage: 'Invalid request format. Expected data array with at least one item.',
  },
};
