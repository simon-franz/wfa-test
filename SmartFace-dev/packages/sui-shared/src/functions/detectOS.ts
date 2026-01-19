export const detectOS = () => {
  const userAgent = navigator.userAgent;

  if (userAgent.includes('iPhone') || userAgent.includes('iPad') || userAgent.includes('iPod')) {
    return 'iOS';
  } else if (userAgent.includes('Android')) {
    return 'Android';
  } else if (userAgent.includes('Win')) {
    return 'Windows';
  } else if (userAgent.includes('Mac')) {
    return 'macOS';
  } else if (userAgent.includes('X11')) {
    return 'UNIX';
  } else if (userAgent.includes('Linux')) {
    return 'Linux';
  } else {
    return 'Unknown';
  }
};
