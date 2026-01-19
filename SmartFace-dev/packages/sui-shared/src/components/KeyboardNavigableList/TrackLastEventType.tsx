import { useEffect } from 'react';

declare global {
  interface Window {
    sfLastEventType?: 'keyboard' | 'pointer';
  }
}

export const TrackLastEventType = () => {
  const onKeyDown = () => {
    window.sfLastEventType = 'keyboard';
  };

  const onMouseMove = () => {
    window.sfLastEventType = 'pointer';
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown, false);
    window.addEventListener('mousemove', onMouseMove, false);

    return () => {
      window.removeEventListener('keydown', onKeyDown, false);
      window.removeEventListener('mousemove', onMouseMove, false);
    };
  }, []);

  return null;
};
