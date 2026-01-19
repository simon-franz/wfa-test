'use server';

import type { SendTwoFactorResponse } from '../../types/login.types';
import {
  deleteVerificationCode,
  generateVerificationCode,
  sendVerificationEmail,
  storeVerificationCode,
} from '../../utils/auth';

// TODO: Merge with authentication.ts
export const sendTwoFactor = async (_prevState: unknown, formData: FormData): Promise<SendTwoFactorResponse> => {
  const email = formData.get('email') as string;
  const companyId = formData.get('companyId') as string;
  const userId = formData.get('userId') as string;

  if (!email || !companyId || !userId) {
    return {
      success: false,
      errorMessage: 'Email, companyId and userId are required',
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      errorMessage: 'Invalid email format',
    };
  }

  try {
    await deleteVerificationCode(companyId, userId);
    const twoFactorCode = generateVerificationCode();
    await storeVerificationCode(companyId, userId, twoFactorCode, 10);

    // Send verification email
    const emailSent = await sendVerificationEmail(email, twoFactorCode, companyId);

    if (!emailSent) {
      return {
        success: false,
        errorMessage: 'Failed to send verification email',
      };
    }

    console.log(`2FA code sent to ${email} for ${companyId}:${userId}`);

    return {
      success: true,
      expiresIn: 600, // 10 minutes in seconds
    };
  } catch (error) {
    console.error('Error in send-2fa:', error);

    return {
      success: false,
      errorMessage: 'Internal server error',
    };
  }
};
