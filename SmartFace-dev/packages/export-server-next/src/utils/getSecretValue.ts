import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient({ region: 'eu-west-1' });

export const getSecretValue = async (secretName: string) => {
  // If we are in dev and a custom secret is defined then use that:
  if (process.env.NODE_ENV === 'development' && process.env.CUSTOM_SECRET) {
    return process.env.CUSTOM_SECRET;
  }

  // production
  try {
    const command = new GetSecretValueCommand({ SecretId: secretName });
    const response = await client.send(command);
    if (response.SecretString) {
      return response.SecretString;
    }
  } catch (error) {
    console.error('Error fetching secret:', error);
    throw new Error('Failed to fetch secret');
  }
};
