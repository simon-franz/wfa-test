import { validateInput } from '../http/validation';
import { getRedisClient } from '../storage/redis';
import { logRateLimit } from '../system/logging';

// TODO: Use login.types.ts
export type RateLimitResult = {
  allowed: boolean;
  remainingAttempts?: number;
  waitTime?: number;
};

export const checkGenerationRateLimit = async (identifier: string): Promise<RateLimitResult> => {
  if (!validateInput(identifier, 'email') && !validateInput(identifier, 'id')) {
    throw new Error('Invalid identifier for rate limiting');
  }

  const redis = getRedisClient();
  const rateLimitKey = `rate_limit:generate:${identifier}`;
  const maxAttempts = Number.parseInt(process.env.MAX_GENERATION_ATTEMPTS || '2', 10);
  const windowMinutes = 60;

  try {
    const current = await redis.get(rateLimitKey);

    if (!current) {
      await redis.setex(rateLimitKey, windowMinutes * 60, '1');
      logRateLimit('generation', identifier, false);

      return { allowed: true };
    }

    const attempts = Number.parseInt(current, 10);
    if (attempts >= maxAttempts) {
      const ttl = await redis.ttl(rateLimitKey);
      logRateLimit('generation', identifier, true);

      return { allowed: false, waitTime: ttl };
    }

    await redis.incr(rateLimitKey);
    logRateLimit('generation', identifier, false);

    return { allowed: true };
  } catch (error) {
    // If Redis is unavailable, allow the operation but log the error
    console.error('Rate limit check failed:', error);

    return { allowed: true };
  }
};

// Checks rate limiting for verification attempts (against brute force)
export const checkVerificationRateLimit = async (identifier: string): Promise<RateLimitResult> => {
  if (!validateInput(identifier, 'email') && !validateInput(identifier, 'id')) {
    throw new Error('Invalid identifier for rate limiting');
  }

  const redis = getRedisClient();
  const rateLimitKey = `rate_limit:verify:${identifier}`;
  const maxAttempts = Number.parseInt(process.env.MAX_VERIFICATION_ATTEMPTS || '3', 10);
  const windowMinutes = 15;

  try {
    const current = await redis.get(rateLimitKey);

    if (!current) {
      await redis.setex(rateLimitKey, windowMinutes * 60, '1');
      logRateLimit('verification', identifier, false);

      return { allowed: true, remainingAttempts: maxAttempts - 1 };
    }

    const attempts = Number.parseInt(current, 10);
    if (attempts >= maxAttempts) {
      logRateLimit('verification', identifier, true);

      return { allowed: false, remainingAttempts: 0 };
    }

    await redis.incr(rateLimitKey);
    const remainingAttempts = maxAttempts - attempts - 1;
    logRateLimit('verification', identifier, false);

    return { allowed: true, remainingAttempts };
  } catch (error) {
    // If Redis is unavailable, allow the operation but log the error
    console.error('Rate limit check failed:', error);

    return { allowed: true, remainingAttempts: maxAttempts };
  }
};

export const resetRateLimit = async (identifier: string, type: 'generation' | 'verification'): Promise<void> => {
  if (!validateInput(identifier, 'email') && !validateInput(identifier, 'id')) {
    throw new Error('Invalid identifier for rate limit reset');
  }

  const redis = getRedisClient();
  const rateLimitKey = `rate_limit:${type}:${identifier}`;

  try {
    await redis.del(rateLimitKey);
  } catch (error) {
    console.error('Rate limit reset failed:', error);
  }
};

export const getRateLimitStatus = async (
  identifier: string,
  type: 'generation' | 'verification',
): Promise<{ attempts: number; maxAttempts: number; remainingAttempts: number }> => {
  if (!validateInput(identifier, 'email') && !validateInput(identifier, 'id')) {
    throw new Error('Invalid identifier for rate limit status');
  }

  const redis = getRedisClient();
  const rateLimitKey = `rate_limit:${type}:${identifier}`;
  const maxAttempts =
    type === 'generation'
      ? Number.parseInt(process.env.MAX_GENERATION_ATTEMPTS || '2', 10)
      : Number.parseInt(process.env.MAX_VERIFICATION_ATTEMPTS || '3', 10);

  try {
    const current = await redis.get(rateLimitKey);
    const attempts = current ? Number.parseInt(current, 10) : 0;
    const remainingAttempts = Math.max(0, maxAttempts - attempts);

    return { attempts, maxAttempts, remainingAttempts };
  } catch (error) {
    console.error('Rate limit status check failed:', error);

    return { attempts: 0, maxAttempts, remainingAttempts: maxAttempts };
  }
};
