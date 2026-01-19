'use server';

import type { AuthenticationClientRequest, AuthenticationClientResponse } from '../../types/login.types';
import { sendVerificationEmail } from '../../utils/auth/email';
import { deleteVerificationCode, storeVerificationCode } from '../../utils/auth/operations';
import { generateVerificationCode } from '../../utils/auth/security';
import { authenticationErrors, validCredentials } from './authenticationsResponses';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// TODO: Merge with sendTwoFactor.ts
export const authenticate = async (_prevState: unknown, formData: FormData): Promise<AuthenticationClientResponse> => {
  await delay(1500);

  const companyId = formData.get('companyId') as AuthenticationClientRequest['companyId'];
  const userId = formData.get('userId') as AuthenticationClientRequest['userId'];
  const password = formData.get('password') as AuthenticationClientRequest['password'];

  if (!companyId?.trim() || !userId?.trim() || !password?.trim()) {
    return {
      success: false,
      ...authenticationErrors.invalidFormat,
    };
  }

  try {
    const matchingCredential = Object.values(validCredentials).find((credential) => credential.userId === userId);

    // WRONG CREDENTIALS
    if (!matchingCredential || matchingCredential.companyId !== companyId || matchingCredential.password !== password) {
      return {
        success: false,
        ...authenticationErrors.invalidCredentials,
      };
    }

    const authResponse = matchingCredential.response;
    if (authResponse.twoFactor) {
      const { selection, defaultMethod, methods } = authResponse.twoFactor;

      // 2FA E-MAIL
      if (defaultMethod === 'email' && !selection) {
        try {
          // REDIS
          // TODO: Add check for multiple code generation attempts
          await deleteVerificationCode(companyId, userId);
          const twoFactorCode = generateVerificationCode();
          await storeVerificationCode(companyId, userId, twoFactorCode, 10);

          // E-MAIL
          // TODO: Implement E-Mail
          if (methods?.email.email) {
            const emailSent = await sendVerificationEmail(methods?.email.email, twoFactorCode, companyId);
            console.log('emailSent:', emailSent);

            // if (!emailSent) {
            //   return {
            //     success: false,
            //     errorMessage: 'Failed to send verification email',
            //   };
            // }
          }

          return authResponse;
        } catch (twoFactorError) {
          const ErrorMessage = 'Failed to generate/store/send 2FA code.';
          console.error(ErrorMessage, twoFactorError);

          return {
            success: false,
            errorMessage: ErrorMessage,
          };
        }
      }
    }

    // 2FA SELECTION
    return authResponse;
  } catch (error) {
    const ErrorMessage = 'Authentication failed. Please try again.';
    console.error(ErrorMessage, error);

    return {
      success: false,
      errorMessage: ErrorMessage,
    };
  }
};
