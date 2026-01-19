export { sendVerificationEmail, validateEmailTemplate, generateEmailContent } from './email';
export { storeVerificationCode, verifyCode, deleteVerificationCode } from './operations';
export { generateVerificationCode, hashCode, verifyCodeHash } from './security';
export { checkGenerationRateLimit, checkVerificationRateLimit, resetRateLimit, getRateLimitStatus } from './rateLimit';
export { authenticate } from '../../data-access/auth/authentication';
export type { RateLimitResult } from './rateLimit';
