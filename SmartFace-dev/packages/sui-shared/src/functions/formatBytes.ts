export const formatBytes = (bytes: number): string => {
  if (!bytes) {
    return '0 Bytes';
  }
  const unitStepSize = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(unitStepSize));
  const safeI = i < sizes.length ? i : sizes.length - 1;

  return `${Number.parseFloat((bytes / Math.pow(unitStepSize, safeI)).toFixed(2)).toLocaleString()} ${sizes[safeI]}`;
};
