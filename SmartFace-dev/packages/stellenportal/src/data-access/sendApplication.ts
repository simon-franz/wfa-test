/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

// TODO: This component is fully WIP. Waiting for API-Team to relase endpoint. Please ignore.

export const sendApplication = async (_prevState: unknown, formData: FormData) => {
  // const rawData = Object.fromEntries(formData.entries());

  try {
    // Remove all query parameters - the API example didn't show any
    /* const queryParams = {
      customerCompanyNumber: '37044',
    }; */

    // Try the most minimal possible payload matching the API example exactly
    const requestData = {
      data: [
        {
          salutation: 'mr',
          title: 'Nothing',
          firstName: 'Alexander',
          lastName: 'Kiefer',
          email: 'alexander.kiefer@hrworks.de',
          countryCode: 'DEU',
          postOfferId: '5077b0',
          postCompanyId: 'dev7eb395',
          hasPrivacyTermsAccepted: true,
          permissionToStoreApplication: 'afterApplication',
          howDidYouHearAboutUs: 'recruitingEvents',
          userAgent: 'string',
          ipAddress: 'string',
          xingUrl: 'string',
          files: [],
        },
      ],
    };

    console.log('Sending request data:', JSON.stringify(requestData, null, 2));

    // await apiClient.post('/applicant-management/job-applications', requestData, { queryParams });

    return { message: 'Application Sent...', success: true, inputs: formData, errors: {} };
  } catch (error) {
    console.error('Full API Error:', error);

    // Try to extract more detailed error information
    if (error && typeof error === 'object' && 'response' in error) {
      const apiError = (error as any).response;
      console.error('API Response Status:', apiError?.status);
      console.error('API Response Data:', apiError?.data);
      console.error('API Response Headers:', apiError?.headers);

      if (apiError?.status === 400 && apiError?.data?.additionalErrors) {
        const fieldErrors: Record<string, string[]> = {};
        apiError.data.additionalErrors.forEach((err: any) => {
          console.error(`API Error ${err.errorCode}: ${err.errorMessage}`);
        });

        return {
          success: false,
          message: apiError.data.errorMessage || 'Please fix the errors in the form',
          inputs: formData,
          errors: fieldErrors,
        };
      }
    }

    const errorMsg = 'An error occurred while submitting your application. Please try again.';

    return {
      success: false,
      message: errorMsg,
      inputs: formData,
      errors: {},
    };
  }
};
