import confetti from 'canvas-confetti';
import { useCallback, useEffect } from 'react';

import type { ConfettiDefaults, ConfettiFireworksProps } from './ConfettiFireworks.types';

export const ConfettiFireworks = ({ zIndex, duration = 8000, intervalTime = 250 }: ConfettiFireworksProps) => {
  const randomInRange = useCallback((min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }, []);

  const createFirework = useCallback(
    (defaults: ConfettiDefaults, timeLeft: number, totalDuration: number) => {
      const particleCount = 50 * (timeLeft / totalDuration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    },
    [randomInRange],
  );

  useEffect(() => {
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);

        return;
      }

      createFirework(defaults, timeLeft, duration);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [zIndex, duration, intervalTime, createFirework]);

  return null;
};
