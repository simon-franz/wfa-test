import { getCircularReplacer } from './getCircularReplacer';

export const stringifyError = (error: Error) => {
  try {
    return JSON.stringify(error);
  } catch (error_: unknown) {
    console.info('Error serializing error object. May contain circular references:', error_);
  }
  try {
    return JSON.stringify(error, getCircularReplacer());
  } catch (error_: unknown) {
    console.error('Error serializing error object:', error_);
  }

  return {
    message: error?.message,
    name: error?.name,
    cause: error?.cause,
  };
};
