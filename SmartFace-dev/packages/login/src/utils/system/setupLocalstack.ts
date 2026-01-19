#!/usr/bin/env bun

import AWS from 'aws-sdk';

import { createLogSection, logDivider } from './logging';

const fromEmail = process.env.FROM_EMAIL || 'noreply@hrworks.com';
const testEmail = process.env.TEST_USER_EMAIL || 'test@example.com';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
  region: process.env.AWS_REGION || 'eu-west-1',
});

const ses = new AWS.SES({
  endpoint: process.env.AWS_ENDPOINT || 'http://localhost:4566',
  region: process.env.AWS_REGION || 'eu-west-1',
});

const setupSES = async (): Promise<void> => {
  try {
    console.log('');
    console.log(`Verifying sender email: ${fromEmail}`);
    await ses.verifyEmailIdentity({ EmailAddress: fromEmail }).promise();
    console.log('[SUCCESS] Sender email verified successfully');

    console.log('');
    console.log(`Verifying recipient email: ${testEmail}`);
    await ses.verifyEmailIdentity({ EmailAddress: testEmail }).promise();
    console.log('[SUCCESS] Recipient email verified successfully');

    await new Promise((resolve) => setTimeout(resolve, 2000));

    logDivider('-', 50, 'dim');
    console.log('Listing verified email identities:');
    const identities = await ses.listVerifiedEmailAddresses().promise();
    if (identities?.VerifiedEmailAddresses && identities.VerifiedEmailAddresses.length > 0) {
      identities.VerifiedEmailAddresses.forEach((email) => {
        console.log(`[VERIFIED] ${email}`);
      });
    } else {
      console.log('[WARNING] No verified email addresses found');
      console.log('[INFO] This might be expected in LocalStack development mode');
    }

    logDivider('-', 50, 'dim');
    console.log('Setting up configuration set...');
    try {
      await ses
        .createConfigurationSet({
          ConfigurationSet: {
            Name: 'hrworks-2fa',
          },
        })
        .promise();
      console.log('[SUCCESS] Created configuration set: hrworks-2fa');
    } catch (error: unknown) {
      const awsError = error as { code?: string; message?: string };
      if (awsError.code === 'ConfigurationSetAlreadyExistsException') {
        console.log('[INFO] Configuration set already exists');
      } else {
        console.log(`[WARNING] Could not create configuration set: ${awsError.message || 'Unknown error'}`);
      }
    }

    console.log('LocalStack SES setup completed successfully!');
    console.log(`Sender email configured: ${fromEmail}`);
    console.log(`Test recipient configured: ${testEmail}`);

    // Display test user credentials if configured
    const testCompanyId = process.env.TEST_USER_COMPANY_ID;
    const testUserId = process.env.TEST_USER_ID;
    const testPassword = process.env.TEST_USER_PASSWORD;

    if (testCompanyId && testUserId && testPassword) {
      logDivider('-', 50, 'dim');
      console.log('Test User Credentials Available:');
      console.log(`[COMPANY] ${testCompanyId}`);
      console.log(`[USER] ${testUserId}`);
      console.log(`[EMAIL] ${testEmail}`);
      console.log(`[PASSWORD] ${testPassword}`);
      logDivider('-', 50, 'dim');
    } else {
      console.log('[INFO] No test user credentials configured in environment');
    }

    console.log('LocalStack Web UI: http://localhost:4571');
    console.log('You can view sent emails in the LocalStack Web UI under SES');
    console.log('');
  } catch (error: unknown) {
    createLogSection('SETUP FAILED', undefined, {
      color: 'red',
      bgColor: 'white',
    });
    console.error('[ERROR] Error setting up LocalStack SES:', error);
    process.exit(1);
  }
};

const checkHealth = async (): Promise<boolean> => {
  try {
    console.log('Checking LocalStack health...');
    const response = await fetch('http://localhost:4566/_localstack/health');
    const health = await response.json();

    if (health.services?.ses === 'available') {
      console.log('[READY] LocalStack SES is available');

      return true;
    } else {
      console.log(`[WAITING] LocalStack SES is not ready yet`);
      console.log(
        `[STATUS] Services: ${Object.entries(health.services || {})
          .map(([service, status]) => `${service}: ${status}`)
          .join(', ')}`,
      );

      return false;
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.log(`[WAITING] LocalStack is not ready yet: ${errorMessage}`);

    return false;
  }
};

const waitForLocalStack = async (maxAttempts = 30, interval = 2000): Promise<boolean> => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const isReady = await checkHealth();

    if (isReady) {
      console.log(`[READY] LocalStack is ready (attempt ${attempt}/${maxAttempts})`);

      return true;
    }

    if (attempt < maxAttempts) {
      console.log(`[RETRY] Attempt ${attempt}/${maxAttempts} - retrying in ${interval / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }

  throw new Error('LocalStack did not become ready within the expected time');
};

const main = async (): Promise<void> => {
  try {
    createLogSection('SETUP LOCALSTACK', undefined, {
      color: 'white',
      bgColor: 'blue',
    });

    await waitForLocalStack();
    await setupSES();
  } catch (error: unknown) {
    createLogSection('SETUP FAILED', undefined, {
      color: 'white',
      bgColor: 'red',
    });
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[ERROR] Setup failed:', errorMessage);
    process.exit(1);
  }
};

await main();
