import type { VerificationCode } from '../../types/login.types';
import { executeWithRetry } from '../http/retry';
import { validateInput } from '../http/validation';
import { getRedisClient } from '../storage/redis';
import { logError, logSecurely } from '../system/logging';
import { hashCode, verifyCodeHash } from './security';

// TODO: Use login.types
export const storeVerificationCode = async (
  companyId: string,
  userId: string,
  code: string,
  ttlMinutes?: number,
): Promise<void> => {
  if (!validateInput(companyId, 'id') || !validateInput(userId, 'id') || !validateInput(code, 'code')) {
    throw new Error('Invalid input parameters for code storage');
  }

  await executeWithRetry(async () => {
    const redis = getRedisClient();
    const key = `${companyId}:${userId}`;
    const { hash, salt } = hashCode(code, companyId, userId);
    const ttl = ttlMinutes || Number.parseInt(process.env.TWO_FACTOR_TTL || '10', 10);

    const verificationCode: VerificationCode = {
      hashedCode: hash,
      salt: salt,
      createdAt: new Date().toISOString(),
      attempts: 0,
    };

    await redis.setex(key, ttl * 60, JSON.stringify(verificationCode));
  });
};

export const verifyCode = async (companyId: string, userId: string, providedCode: string): Promise<boolean> => {
  if (!validateInput(companyId, 'id') || !validateInput(userId, 'id') || !validateInput(providedCode, 'code')) {
    throw new Error('Invalid input parameters for code verification');
  }

  // Rate limiting will be handled by incrementing attempts in the stored object
  try {
    const redis = getRedisClient();
    const key = `${companyId}:${userId}`;

    const storedData = await redis.get(key);
    if (!storedData) {
      logSecurely('No code found in Redis', { companyId, userId });

      return false;
    }

    const codeData: VerificationCode = JSON.parse(storedData);
    const maxVerificationAttempts = Number.parseInt(process.env.MAX_VERIFICATION_ATTEMPTS || '3', 10);

    // Check if max attempts exceeded
    if (codeData.attempts >= maxVerificationAttempts) {
      logSecurely('Max verification attempts exceeded', { companyId, userId });

      return false;
    }

    const isValid = verifyCodeHash(providedCode, companyId, userId, codeData.hashedCode, codeData.salt);

    if (isValid) {
      await redis.del(key);
      logSecurely('Code verification successful. Redis Entry deleted for:', { companyId, userId });
    } else {
      // Increment attempts and save back to Redis
      codeData.attempts += 1;
      const ttl = await redis.ttl(key);
      await redis.setex(key, ttl > 0 ? ttl : 600, JSON.stringify(codeData));
      logSecurely('Code verification failed', { companyId, userId, attempts: codeData.attempts });
    }

    return isValid;
  } catch (error) {
    logError('Code verification error', error as Error, { companyId, userId });

    return false;
  }
};

export const deleteVerificationCode = async (companyId: string, userId: string): Promise<void> => {
  if (!validateInput(companyId, 'id') || !validateInput(userId, 'id')) {
    throw new Error('Invalid input parameters');
  }

  try {
    const redis = getRedisClient();
    const key = `${companyId}:${userId}`;
    await redis.del(key);
    logSecurely('Verification code deleted with user key', { companyId, userId });
  } catch (error) {
    logError('Code deletion failed', error as Error, { companyId, userId });
  }
};
