export const detectBrowser = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'Unknown';
  }

  const userAgent = navigator.userAgent;
  if (userAgent.includes('Firefox')) {
    return 'Firefox';
  } else if (userAgent.includes('AppleWebKit') && !userAgent.includes('Chrome')) {
    return 'Safari';
  } else if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    return 'Chrome';
  } else if (userAgent.includes('OPR') || userAgent.includes('Opera')) {
    return 'Opera';
  } else if (userAgent.includes('Edg')) {
    return 'Edge';
  } else if (userAgent.includes('Trident')) {
    return 'Internet Explorer';
  } else {
    return 'Unknown';
  }
};
