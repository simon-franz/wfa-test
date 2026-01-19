import confetti from 'canvas-confetti';

import type { ConfettiProps } from './Confetti.types';

export const Confetti = ({ zIndex }: ConfettiProps) => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    zIndex,
  });

  return null;
};
