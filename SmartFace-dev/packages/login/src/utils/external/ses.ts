import AWS from 'aws-sdk';

let sesClient: AWS.SES | null = null;

const createSESClient = (): AWS.SES => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'eu-west-1',
  });

  const sesConfig: AWS.SES.ClientConfiguration = {
    region: process.env.AWS_REGION || 'eu-west-1',
  };

  if (process.env.AWS_ENDPOINT) {
    sesConfig.endpoint = process.env.AWS_ENDPOINT;
  }

  return new AWS.SES(sesConfig);
};

export const getSESClient = (): AWS.SES => {
  if (!sesClient) {
    sesClient = createSESClient();
  }

  return sesClient;
};
