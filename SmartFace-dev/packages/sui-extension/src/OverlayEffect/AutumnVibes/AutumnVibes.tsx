import confetti from 'canvas-confetti';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import type { AutumnVibesProps } from './AutumnVibes.types';

const DEFAULT_SCALAR = 3;
const DEFAULT_TICKS = 400;
const PARTICLE_COUNT = 1;
const DEFAULT_DECAY_BASE = 0.93;
const DEFAULT_DECAY_RANGE = 0.07;
const INNER_RADIUS = 0.2;
const OUTER_RADIUS = 0.8;
const DEFAULT_START_VELOCITY_BASE = 1;
const DEFAULT_START_VELOCITY_RANGE = 2;
const DEFAULT_GRAVITY = 0.5;
const DEFAULT_DRIFT_RANGE = 5;
const DEFAULT_DRIFT_OFFSET = 2.5;
const LEAF_SPAWN_PROBABILITY = 0.1;

export const AutumnVibes = ({ zIndex, duration = 8000 }: AutumnVibesProps) => {
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const scalar = DEFAULT_SCALAR;
  const leafShapes = useMemo(() => {
    return [confetti.shapeFromText({ text: '🍂', scalar }), confetti.shapeFromText({ text: '🍁', scalar })];
  }, [scalar]);

  const createLeafMovement = useCallback(() => {
    if (Math.random() > LEAF_SPAWN_PROBABILITY) return;

    const angle = Math.random() * Math.PI * 2;
    const radius = INNER_RADIUS + Math.random() * (OUTER_RADIUS - INNER_RADIUS);
    const chosenShape = leafShapes[Math.floor(Math.random() * leafShapes.length)];

    confetti({
      shapes: [chosenShape],
      scalar: scalar,
      particleCount: PARTICLE_COUNT,
      origin: {
        x: 0.5 + Math.cos(angle) * radius,
        y: 0.5 + Math.sin(angle) * radius,
      },
      angle: Math.random() * 360,
      startVelocity: DEFAULT_START_VELOCITY_BASE + Math.random() * DEFAULT_START_VELOCITY_RANGE,
      gravity: DEFAULT_GRAVITY,
      drift: Math.random() * DEFAULT_DRIFT_RANGE - DEFAULT_DRIFT_OFFSET,
      ticks: DEFAULT_TICKS,
      zIndex,
      decay: DEFAULT_DECAY_BASE + Math.random() * DEFAULT_DECAY_RANGE,
    });
  }, [leafShapes, scalar, zIndex]);

  useEffect(() => {
    startTimeRef.current = Date.now();

    const animate = () => {
      const now = Date.now();
      if (now - startTimeRef.current < duration) {
        createLeafMovement();
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  });

  return null;
};
