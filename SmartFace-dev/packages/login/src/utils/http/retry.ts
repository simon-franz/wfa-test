import type { RetryOptions } from '../../types/retry.types';
import { logError } from '../system/logging';

export const executeWithRetry = async <T>(operation: () => Promise<T>, options: RetryOptions = {}): Promise<T> => {
  const { maxRetries = 3, baseDelay = 1000, maxDelay = 30_000, jitter = true } = options;

  let lastError: Error;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries - 1) {
        break;
      }

      let delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);

      if (jitter) {
        delay = delay * (0.5 + Math.random() * 0.5);
      }

      logError(`Operation failed, retrying in ${delay}ms`, lastError, {
        attempt: attempt + 1,
        maxRetries,
      });

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error(`Operation failed after ${maxRetries} attempts: ${lastError!.message}`);
};
