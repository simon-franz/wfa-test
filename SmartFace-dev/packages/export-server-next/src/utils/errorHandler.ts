type ErrorReturnType = {
  statusCode: number;
  message: string;
};

export const handleError = (error: unknown): ErrorReturnType => {
  console.log(error);

  if (error instanceof Error && error.message.includes('Protocol error (Page.captureScreenshot): Page is too large')) {
    return { statusCode: 400, message: 'Too many nodes. Browser window too big for Puppeteer.' };
  }

  return { statusCode: 500, message: 'An unexpected error occurred while Exporting.' };
};
