import type { FireworksHandlers, FireworksOptions } from '@fireworks-js/react';
import { useEffect, useRef, useState } from 'react';

import { S } from './RocketFireworks.styles';
import type { RocketFireworksProps } from './RocketFireworks.types';

export const RocketFireworks = ({ zIndex, duration = 10_000 }: RocketFireworksProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const fireworksRef = useRef<FireworksHandlers | null>(null);
  const [fireworksFinished, setFireworksFinished] = useState(false);

  useEffect(() => {
    setFireworksFinished(false);
    setIsVisible(true);
    let innerTimer: NodeJS.Timeout;
    const outerTimer = setTimeout(() => {
      fireworksRef.current?.waitStop().then(() => {
        setFireworksFinished(true);
        innerTimer = setTimeout(() => {
          setIsVisible(false);
        }, 500);
      });
    }, duration);

    return () => {
      clearTimeout(outerTimer);
      innerTimer && clearTimeout(innerTimer);
    };
  }, [duration]);

  const options: FireworksOptions = {
    autoresize: true,
    opacity: 0.3,
    acceleration: 1,
    friction: 0.97,
    gravity: 1.5,
    particles: 200,
    traceLength: 1,
    traceSpeed: 8,
    explosion: 7,
    intensity: 30,
    flickering: 50,
    lineStyle: 'round',
    hue: {
      min: 0,
      max: 360,
    },
    delay: {
      min: 30,
      max: 60,
    },
    rocketsPoint: {
      min: 50,
      max: 50,
    },
    lineWidth: {
      explosion: {
        min: 1,
        max: 5,
      },
      trace: {
        min: 1,
        max: 2,
      },
    },
    brightness: {
      min: 50,
      max: 80,
    },
    decay: {
      min: 0.015,
      max: 0.03,
    },
  };

  if (!isVisible) return null;

  return <S.Fireworks $fireworksFinished={fireworksFinished} $zIndex={zIndex} options={options} ref={fireworksRef} />;
};
