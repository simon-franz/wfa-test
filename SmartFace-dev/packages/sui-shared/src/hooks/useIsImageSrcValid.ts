import { useEffect, useState } from 'react';

export const useIsImageSrcValid = (src?: string) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsValid(false);

      return;
    }

    const img = new Image();

    const handleLoad = () => setIsValid(true);
    const handleError = () => setIsValid(false);

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    img.src = src;

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src]);

  return isValid;
};
