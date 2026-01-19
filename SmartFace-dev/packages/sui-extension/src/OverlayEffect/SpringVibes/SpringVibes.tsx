import confetti from 'canvas-confetti';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import type { Insect, SpringVibesProps } from './SpringVibes.types';

const DEFAULT_DURATION_MS = 9000;
const FADE_DURATION_MS = 2000;
const SCALAR_FACTOR = 3;
const PARTICLE_COUNT = 1;
const INSECT_COUNT = 3;
const INSECT_SIZE = 25;
const INSECT_SPEED = 2;
const FLOWER_SPAWN_PROBABILITY = 0.1;
const FLOWER_RADIUS = 0.4;
const FLOWER_VELOCITY = 1.5;
const FLOWER_GRAVITY = 0.3;
const FLOWER_DRIFT = 2.5;
const FLOWER_TICKS = 400;
const FLOWER_DECAY_RANGE = 0.07;
const FLOWER_DECAY_BASE = 0.93;
const INSECT_DIRECTION_CHANGE_PROBABILITY = 0.02;
const INSECT_DIRECTION_CHANGE_ANGLE = Math.PI / 6;

export const SpringVibes = ({ zIndex, duration = DEFAULT_DURATION_MS }: SpringVibesProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const insectsRef = useRef<Insect[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const randomInRange = useCallback((min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }, []);

  const scalar = SCALAR_FACTOR;
  const flowerShapes = useMemo(() => {
    return [confetti.shapeFromText({ text: '🌸', scalar }), confetti.shapeFromText({ text: '🌺', scalar })];
  }, [scalar]);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = zIndex.toString();
    document.body.append(canvas);

    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createInsects = () => {
      const emojis = ['🦋', '🐞'];
      insectsRef.current = [];
      for (let i = 0; i < INSECT_COUNT; i++) {
        const emoji = emojis[Math.round(Math.random())];
        insectsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: INSECT_SIZE * randomInRange(0.8, 1.2),
          speed: INSECT_SPEED * randomInRange(0.5, 1.5),
          angle: Math.random() * Math.PI * 2,
          emoji: emoji,
        });
      }
    };

    const createFlowerMovement = () => {
      if (Math.random() > FLOWER_SPAWN_PROBABILITY) return;

      const angle = Math.random() * Math.PI * 2;
      const radius = FLOWER_RADIUS * (Math.random() * 1.5 + 0.5);
      const chosenShape = flowerShapes[Math.floor(Math.random() * flowerShapes.length)];

      confetti({
        shapes: [chosenShape],
        scalar: scalar,
        particleCount: PARTICLE_COUNT,
        origin: {
          x: 0.5 + Math.cos(angle) * radius,
          y: 0.5 + Math.sin(angle) * radius,
        },
        angle: Math.random() * 360,
        startVelocity: FLOWER_VELOCITY * (Math.random() + 0.5),
        gravity: FLOWER_GRAVITY,
        drift: FLOWER_DRIFT * (Math.random() * 2 - 1),
        ticks: FLOWER_TICKS,
        zIndex,
        decay: FLOWER_DECAY_BASE + Math.random() * FLOWER_DECAY_RANGE,
      });
    };

    const animationEnd = Date.now() + duration;
    const fadeStart = animationEnd - FADE_DURATION_MS;

    const animate = () => {
      const now = Date.now();
      const timeLeft = animationEnd - now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      insectsRef.current.forEach((insect) => {
        insect.x += Math.cos(insect.angle) * insect.speed;
        insect.y += Math.sin(insect.angle) * insect.speed;

        if (Math.random() < INSECT_DIRECTION_CHANGE_PROBABILITY) {
          insect.angle += randomInRange(-INSECT_DIRECTION_CHANGE_ANGLE, INSECT_DIRECTION_CHANGE_ANGLE);
        }

        if (insect.x < 0 || insect.x > canvas.width || insect.y < 0 || insect.y > canvas.height) {
          insect.angle += Math.PI;
        }

        ctx.save();
        ctx.font = `${insect.size}px Arial`;
        ctx.translate(insect.x, insect.y);
        ctx.rotate(insect.angle + Math.PI / 2);
        ctx.fillText(insect.emoji, 0, 0);
        ctx.restore();
      });

      if (now < fadeStart) {
        createFlowerMovement();
      }

      if (timeLeft > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        canvas.style.transition = 'opacity 1s';
        canvas.style.opacity = '0';
        setTimeout(() => canvas.remove(), 1000);
      }
    };

    resizeCanvas();
    createInsects();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (document.body.contains(canvas)) {
        canvas.remove();
      }
    };
  });

  return null;
};
