import { CryptoHasher } from 'bun';

/**
 * Signs a string using the server secret
 * @param stringToSign - String to be signed
 * @param serverSignature - The server signature secret
 * @returns Base64 encoded HMAC
 */
export const signStringWithServerSecret = (stringToSign: string, serverSignature: string): string => {
  // Step 1: Create SHA-1 hash of the input string (as binary)
  const sha1Binary = new CryptoHasher('sha1').update(stringToSign).digest();

  // Step 2: Create HMAC SHA-1 of the SHA-1 hash using server signature
  const hmacBinary = new CryptoHasher('sha1', serverSignature).update(sha1Binary).digest();

  // Step 3: Base64 encode the result
  return hmacBinary.toString('base64');
};

/**
 * Creates a signature object with timestamp
 * @returns JSON string to be signed
 */
export const createSignatureString = (): string => {
  const signatureObj = {
    SignatureCollection: 'API-Server-Signatures',
    timestamp: Math.floor(Date.now() / 1000).toString(),
  };

  return JSON.stringify(signatureObj);
};
