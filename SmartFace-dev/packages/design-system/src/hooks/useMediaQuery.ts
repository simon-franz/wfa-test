import { useEffect, useState } from 'react';

import { mq } from '../mediaQueries';

/**
 * Custom hook that checks if a media query matches the current viewport.
 *
 * @param {keyof typeof mq} mediaQueryKey - The key of the media query to match.
 *
 * @returns {boolean} - Returns `true` if the media query matches the current viewport, otherwise `false`.
 *
 * @example
 * // Check if the device is a touch device
 * const isTouchDevice = useMediaMatcher('isTouchDevice');
 *
 * @example
 * // Check if the device is small
 * const isSmallDevice = useMediaMatcher('isSmallDevice');
 *
 * @example
 * // Conditional rendering based on device size
 * return (
 *   <div>
 *     {isLargeDevice ? <DesktopView /> : <MobileView />}
 *   </div>
 * );
 */
export const useMediaQuery = (mediaQueryKey: keyof typeof mq) => {
  const mediaQueryString = mq[mediaQueryKey].slice(7);

  const getMatches = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(mediaQueryString).matches;
    }

    return false;
  };

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [mediaQueryString]);

  return matches;
};
