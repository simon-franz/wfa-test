export const isDev = () => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env.NODE_ENV === 'development';
  }
  if (import.meta !== undefined && import.meta.env) {
    return import.meta.env.DEV;
  }

  return false;
};
