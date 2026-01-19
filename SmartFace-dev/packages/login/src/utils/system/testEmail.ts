#!/usr/bin/env bun
import AWS from 'aws-sdk';

import { createLogSection, logDivider } from './logging';

// Configure AWS SDK for LocalStack
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
  region: process.env.AWS_REGION || 'eu-west-1',
});

const ses = new AWS.SES({
  endpoint: process.env.AWS_ENDPOINT || 'http://localhost:4566',
  region: process.env.AWS_REGION || 'eu-west-1',
});

const testEmailSending = async (): Promise<void> => {
  const testEmail = process.argv[2] || process.env.TEST_EMAIL || 'test@example.com';
  const testCode = '123456';
  const companyName = process.env.COMPANY_NAME || 'HRWorks Test';

  createLogSection('2FA - E-MAIL');

  console.log(`Target Email: ${testEmail}`);
  console.log(`Test Code: ${testCode}`);
  console.log(`Company: ${companyName}`);

  logDivider('-', 50, 'dim');

  try {
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"><title>Verification Code</title></head>
        <body style="font-family: Inter, Arial, sans-serif; background-color: #f5f6f8; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #424798; font-size: 28px; margin: 0;"> ${companyName}</h1>
            </div>
            <div style="text-align: center;">
              <h2 style="color: #2c2b31; font-size: 24px; margin-bottom: 20px;">Your Verification Code</h2>
              <p style="color: #3d3c42; font-size: 16px; margin-bottom: 30px;">Please use the following verification code to complete your login:</p>
              <div style="background-color: #eff0ff; border: 2px solid #424798; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <div style="color: #292673; font-size: 32px; font-weight: 600; letter-spacing: 4px; font-family: Monaco, monospace;">${testCode}</div>
              </div>
              <p style="color: #3d3c42; font-size: 16px; margin-bottom: 20px;">This code will expire in <strong>10 minutes</strong> for your security.</p>
              <p style="color: #3d3c42; font-size: 16px;">If you didn't request this code, please ignore this email.</p>
            </div>
            <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ecedf2;">
              <p style="color: #8b8c91; font-size: 12px; margin: 0;">This is an automated message from ${companyName}. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    console.log('Preparing email parameters...');
    const params = {
      Source: process.env.FROM_EMAIL || 'noreply@hrworks.com',
      Destination: {
        ToAddresses: [testEmail],
      },
      Message: {
        Subject: {
          Data: `[TEST] Your ${companyName} Verification Code`,
          Charset: 'utf8',
        },
        Body: {
          Html: {
            Data: emailHtml,
            Charset: 'utf8',
          },
          Text: {
            Data: `Your ${companyName} verification code is: ${testCode}. This code will expire in 10 minutes.`,
            Charset: 'utf8',
          },
        },
      },
    };

    console.log('Sending email via LocalStack SES...');
    const result = await ses.sendEmail(params).promise();

    createLogSection('EMAIL SENT SUCCESSFULLY', undefined, {
      color: 'white',
      bgColor: 'green',
    });
    console.log(`Message ID: ${result.MessageId}`);
    console.log('LocalStack Web UI: http://localhost:4571');
    console.log('You can view the sent email in the LocalStack Web UI under SES');
    console.log('');
  } catch (error: unknown) {
    createLogSection('EMAIL SENDING FAILED', undefined, {
      color: 'white',
      bgColor: 'red',
    });
    console.error('[ERROR] Error sending email:', error);

    const awsError = error as { code?: string };
    if (awsError.code === 'MessageRejected') {
      logDivider('-', 50, 'red');
      console.log('[SOLUTION] Make sure the email addresses are verified in LocalStack SES');
      console.log('[COMMAND] Run: bun run setup:localstack');
    }
  }
};

// Usage info
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('Usage: bun scripts/test-email.js [email]');
  console.log('');
  console.log('Examples:');
  console.log('  bun scripts/test-email.js');
  console.log('  bun scripts/test-email.js user@company.com');
  console.log('');
  console.log('Prerequisites:');
  console.log('  - LocalStack must be running');
  console.log('  - SES must be configured (run: bun run setup:localstack)');
  process.exit(0);
}

// Run the test
await testEmailSending();
