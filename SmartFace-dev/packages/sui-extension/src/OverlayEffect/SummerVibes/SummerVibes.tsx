import { useCallback, useEffect, useRef } from 'react';

import type { SummerObject, SummerVibesProps } from './SummerVibes.types';

const DEFAULT_DURATION_MS = 10_000;
const FADE_DURATION_MS = 3000;
const OBJECT_SIZE_PX = 25;
const OBJECT_SPEED = 2;
const OBJECT_ROTATION_SPEED = 0.05;
const MAX_OBJECT_SPEED = 2;
const OBJECT_DIRECTION_CHANGE_PROBABILITY = 0.03;
const OBJECT_DIRECTION_CHANGE_MAGNITUDE = 0.03;

export const SummerVibes = ({ zIndex, duration = DEFAULT_DURATION_MS }: SummerVibesProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const summerObjectsRef = useRef<SummerObject[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const randomInRange = useCallback((min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }, []);

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

    const createSummerObjects = () => {
      const objectCount = 10;
      const emojis = ['🔆', '🍋', '🍊'];
      summerObjectsRef.current = [];
      for (let i = 0; i < objectCount; i++) {
        summerObjectsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: OBJECT_SIZE_PX * randomInRange(0.8, 1.2),
          speedX: OBJECT_SPEED * (Math.random() * 2 - 1),
          speedY: OBJECT_SPEED * (Math.random() * 2 - 1),
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: OBJECT_ROTATION_SPEED * (Math.random() * 2 - 1),
        });
      }
    };

    const animationEnd = Date.now() + duration;

    const animate = () => {
      const now = Date.now();
      const timeLeft = animationEnd - now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      summerObjectsRef.current.forEach((object) => {
        object.x += object.speedX;
        object.y += object.speedY;
        object.rotation += object.rotationSpeed;

        if (Math.random() < OBJECT_DIRECTION_CHANGE_PROBABILITY) {
          object.speedX += randomInRange(-OBJECT_DIRECTION_CHANGE_MAGNITUDE, OBJECT_DIRECTION_CHANGE_MAGNITUDE);
          object.speedY += randomInRange(-OBJECT_DIRECTION_CHANGE_MAGNITUDE, OBJECT_DIRECTION_CHANGE_MAGNITUDE);
        }

        const speed = Math.hypot(object.speedX, object.speedY);
        if (speed > MAX_OBJECT_SPEED) {
          object.speedX = (object.speedX / speed) * MAX_OBJECT_SPEED;
          object.speedY = (object.speedY / speed) * MAX_OBJECT_SPEED;
        }

        if (object.x < 0 || object.x > canvas.width) object.speedX *= -1;
        if (object.y < 0 || object.y > canvas.height) object.speedY *= -1;

        ctx.save();
        ctx.font = `${object.size}px Arial`;
        ctx.translate(object.x, object.y);
        ctx.rotate(object.rotation);
        ctx.fillText(object.emoji, 0, 0);
        ctx.restore();
      });

      if (timeLeft > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        canvas.style.transition = `opacity ${FADE_DURATION_MS}ms`;
        canvas.style.opacity = '0';
        setTimeout(() => canvas.remove(), FADE_DURATION_MS);
      }
    };

    resizeCanvas();
    createSummerObjects();
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
