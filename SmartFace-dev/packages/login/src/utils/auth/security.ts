import { CryptoHasher } from 'bun';
import crypto from 'node:crypto';

export const generateVerificationCode = (): string => crypto.randomInt(100_000, 1_000_000).toString();

export const hashCode = (
  code: string,
  companyId: string,
  userId: string,
  providedSalt?: string,
): { hash: string; salt: string } => {
  const salt = providedSalt ?? crypto.randomBytes(16).toString('hex');
  const pepper = process.env.HASH_PEPPER;
  if (!pepper) {
    throw new Error('HASH_PEPPER environment variable is required');
  }

  const dataToHash = `${code}${companyId}${userId}${salt}${pepper}`;
  const hmacHash = new CryptoHasher('sha256', salt + pepper).update(dataToHash).digest('hex');

  return {
    hash: hmacHash,
    salt: salt,
  };
};

export const verifyCodeHash = (
  code: string,
  companyId: string,
  userId: string,
  storedHash: string,
  storedSalt: string,
): boolean => {
  try {
    const { hash: providedHash } = hashCode(code, companyId, userId, storedSalt);

    if (providedHash.length !== storedHash.length) {
      return false;
    }

    const providedBuffer = Buffer.from(providedHash, 'hex');
    const storedBuffer = Buffer.from(storedHash, 'hex');

    return crypto.timingSafeEqual(providedBuffer, storedBuffer);
  } catch (error) {
    console.error('Code verification failed:', error);

    return false;
  }
};
