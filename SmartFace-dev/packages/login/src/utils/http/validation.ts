export type ValidationType = 'email' | 'code' | 'id';

export const validateInput = (input: string, type: ValidationType): boolean => {
  if (!input || typeof input !== 'string') {
    return false;
  }

  switch (type) {
    case 'email':
      // RFC 5322 compliant email validation with length limit
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      return emailRegex.test(input) && input.length <= 254;

    case 'code':
      // Exactly 6 digits, no other characters allowed

      return /^\d{6}$/.test(input);

    case 'id':
      // Alphanumeric chars, hyphens, underscores, and colons (for composite keys like companyId:userId)

      return /^[\w:-]+$/.test(input) && input.length <= 100;

    default:
      return false;
  }
};

export const validateInputs = (inputs: Array<{ value: string; type: ValidationType; name: string }>) => {
  const results = inputs.map(({ value, type, name }) => ({
    name,
    isValid: validateInput(value, type),
    value: value ? '[REDACTED]' : value,
  }));

  const allValid = results.every((result) => result.isValid);
  const invalidFields = results.filter((result) => !result.isValid).map((result) => result.name);

  return {
    allValid,
    invalidFields,
    results,
  };
};
