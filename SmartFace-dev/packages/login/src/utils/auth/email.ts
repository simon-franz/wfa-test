import { render } from '@react-email/render';

import { TwoFactorEmailTemplate } from '../../emails/TwoFactorEmailTemplate';
import { getSESClient } from '../external/ses';
import { executeWithRetry } from '../http/retry';
import { validateInput } from '../http/validation';
import { logError, logSecurely, logVerificationCode } from '../system/logging';

export const sendVerificationEmail = async (email: string, code: string, companyName?: string): Promise<boolean> => {
  if (!validateInput(email, 'email') || !validateInput(code, 'code')) {
    throw new Error('Invalid input parameters for email sending');
  }

  if (process.env.NEXT_PUBLIC_REALM === 'local') {
    logVerificationCode(email, code, companyName);

    return true;
  }

  try {
    return await executeWithRetry(
      async () => {
        const ses = getSESClient();
        const emailHtml = await render(TwoFactorEmailTemplate({ code, companyName }));
        const params = {
          Source: process.env.FROM_EMAIL || 'noreply@hrworks.com',
          Destination: {
            ToAddresses: [email],
          },
          Message: {
            Subject: {
              Data: 'Your HRWorks Verification Code',
              Charset: 'utf8',
            },
            Body: {
              Html: {
                Data: emailHtml,
                Charset: 'utf8',
              },
              Text: {
                Data: `Your HRWorks verification code is: ${code}. This code will expire in 10 minutes.`,
                Charset: 'utf8',
              },
            },
          },
        };

        await ses.sendEmail(params).promise();
        logSecurely('Verification email sent successfully', { email });

        return true;
      },
      {
        maxRetries: 3,
        baseDelay: 1000,
      },
    );
  } catch (error) {
    logError('Failed to send verification email', error as Error, { email });

    return false;
  }
};

export const validateEmailTemplate = async (code: string, companyName?: string): Promise<boolean> => {
  try {
    const emailHtml = await render(TwoFactorEmailTemplate({ code, companyName }));

    return emailHtml.length > 0;
  } catch (error) {
    logError('Email template validation failed', error as Error, { companyName });

    return false;
  }
};

export const generateEmailContent = (code: string, companyName?: string) => {
  const subject = 'Your HRWorks Verification Code';
  const textBody = `Your HRWorks verification code is: ${code}. This code will expire in 10 minutes.`;

  return {
    subject,
    textBody,
    companyName: companyName || 'HRWorks',
  };
};
