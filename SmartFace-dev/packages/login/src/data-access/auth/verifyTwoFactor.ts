'use server';

import type { VerifyTwoFactorResponse } from '../../types/login.types';
import { verifyCode } from '../../utils/auth';

export const verifyTwoFactor = async (_prevState: unknown, formData: FormData): Promise<VerifyTwoFactorResponse> => {
  const code = formData.get('code') as string;
  const companyId = formData.get('companyId') as string;
  const userId = formData.get('userId') as string;

  if (!code || !companyId || !userId) {
    return {
      success: false,
    };
  }

  const codeRegex = /^\d{6}$/;
  if (!codeRegex.test(code)) {
    return {
      success: false,
    };
  }

  try {
    const isCodeValid = await verifyCode(companyId, userId, code);

    if (!isCodeValid) {
      return {
        success: false,
      };
    }

    // TODO: HRWorks API - Add Response for Session Cookie
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error in verify-two-factor:', error);

    return {
      success: false,
    };
  }
};
