import { useCallback, useEffect, useRef } from 'react';

import type { Dolphin, Palm, SummerObject, VacationVibesProps } from './VacationVibes.types';

const DEFAULT_DURATION_MS = 10_000;
const FADE_DURATION_MS = 3000;
const OBJECT_SIZE_PX = 25;
const OBJECT_SPEED = 1;
const OBJECT_ROTATION_SPEED = 0.02;
const MAX_OBJECT_SPEED = 2;
const OBJECT_DIRECTION_CHANGE_PROBABILITY = 0.03;
const OBJECT_DIRECTION_CHANGE_MAGNITUDE = 0.03;

const DOLPHIN_SPAWN_PROBABILITY = 0.01;
const DOLPHIN_JUMP_SPEED = 5;
const DOLPHIN_FALL_SPEED = 3;
const DOLPHIN_ROTATION_SPEED = 0.2;
const DOLPHIN_MAX_HEIGHT = 0.5;

const WAVE_COUNT = 3;
const WAVE_COLORS = ['rgba(0, 100, 255, 0.3)', 'rgba(0, 150, 255, 0.3)', 'rgba(0, 200, 255, 0.5)'];
const WAVE_AMPLITUDE = 20;
const WAVE_FREQUENCY = 0.02;
const WAVE_SPEED = 0.08;

const MIN_PALM_SIZE = 300;
const MAX_PALM_SIZE = 400;
const GROWTH_SPEED = 2;
const SWAY_AMPLITUDE = 5;
const PALM_ANGLE = -Math.PI / 6;

export const VacationVibes = ({ zIndex, duration = DEFAULT_DURATION_MS }: VacationVibesProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const summerObjectsRef = useRef<SummerObject[]>([]);
  const dolphinsRef = useRef<Dolphin[]>([]);
  const palmsRef = useRef<Palm[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const randomInRange = useCallback((min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }, []);

  const drawWaves = useCallback((ctx: CanvasRenderingContext2D, time: number) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const waveTop = height / 1.5;

    for (let i = 0; i < WAVE_COUNT; i++) {
      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let x = 0; x < width; x++) {
        const y = Math.sin(x * WAVE_FREQUENCY + time * WAVE_SPEED + (i * Math.PI * 2) / WAVE_COUNT) * WAVE_AMPLITUDE;
        ctx.lineTo(x, waveTop + y - i * WAVE_AMPLITUDE);
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      ctx.fillStyle = WAVE_COLORS[i];
      ctx.fill();
    }
  }, []);

  const createPalms = useCallback(
    (canvas: HTMLCanvasElement) => {
      palmsRef.current = [];
      const leftPalmSize = randomInRange(MIN_PALM_SIZE, MAX_PALM_SIZE);
      const rightPalmSize = randomInRange(MIN_PALM_SIZE, MAX_PALM_SIZE);

      palmsRef.current.push(
        {
          x: canvas.width + rightPalmSize / 3,
          y: canvas.height,
          size: 0,
          targetSize: rightPalmSize,
          sway: randomInRange(0, Math.PI * 2),
          swaySpeed: randomInRange(0.01, 0.03),
          initialX: canvas.width + rightPalmSize / 3,
          initialY: canvas.height,
          maxX: canvas.width - rightPalmSize / 10,
          maxY: canvas.height - rightPalmSize * 0.8,
          angle: PALM_ANGLE,
        },
        {
          x: -leftPalmSize / 3,
          y: canvas.height,
          size: 0,
          targetSize: leftPalmSize,
          sway: randomInRange(0, Math.PI * 2),
          swaySpeed: randomInRange(0.01, 0.03),
          initialX: -leftPalmSize,
          initialY: canvas.height,
          maxX: -leftPalmSize + leftPalmSize / 1.5,
          maxY: canvas.height - leftPalmSize * 1.5,
          angle: -PALM_ANGLE,
        },
      );
    },
    [randomInRange],
  );

  const updatePalmsPosition = useCallback(() => {
    if (canvasRef.current && palmsRef.current.length === 2) {
      const canvas = canvasRef.current;
      const [rightPalm, leftPalm] = palmsRef.current;

      rightPalm.initialX = canvas.width + rightPalm.targetSize / 3;
      rightPalm.maxX = canvas.width - rightPalm.targetSize / 10;

      leftPalm.initialX = -leftPalm.targetSize / 3;
      leftPalm.maxX = -leftPalm.targetSize + leftPalm.targetSize / 1.5;

      rightPalm.x =
        rightPalm.initialX + (rightPalm.maxX - rightPalm.initialX) * (rightPalm.size / rightPalm.targetSize);
      leftPalm.x = leftPalm.initialX + (leftPalm.maxX - leftPalm.initialX) * (leftPalm.size / leftPalm.targetSize);
    }
  }, []);

  const resizeCanvas = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      updatePalmsPosition();
    }
  }, [updatePalmsPosition]);

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

    resizeCanvas();

    const createSummerObjects = () => {
      const objectCount = 5;
      const emojis = ['🔆', '😎'];
      summerObjectsRef.current = [];
      for (let i = 0; i < objectCount; i++) {
        summerObjectsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 2),
          size: OBJECT_SIZE_PX * randomInRange(0.8, 1.2),
          speedX: OBJECT_SPEED * (Math.random() * 2 - 1),
          speedY: OBJECT_SPEED * (Math.random() * 2 - 1),
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: OBJECT_ROTATION_SPEED * (Math.random() * 2 - 1),
        });
      }
    };

    const createDolphin = () => {
      if (Math.random() > DOLPHIN_SPAWN_PROBABILITY) return;

      dolphinsRef.current.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 50,
        size: randomInRange(30, 50),
        speed: DOLPHIN_JUMP_SPEED,
        rotation: 0,
        state: 'jumping',
        maxHeight: canvas.height * (1 - DOLPHIN_MAX_HEIGHT),
        rotationDirection: Math.random() < 0.5 ? 1 : -1,
      });
    };

    const animationEnd = Date.now() + duration;
    const fadeStart = animationEnd - FADE_DURATION_MS;

    const animate = () => {
      const now = Date.now();
      const timeLeft = animationEnd - now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      drawWaves(ctx, now * 0.001);
      ctx.restore();

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
        if (object.y < 0 || object.y > canvas.height / 2) object.speedY *= -1;

        ctx.save();
        ctx.font = `${object.size}px Arial`;
        ctx.translate(object.x, object.y);
        ctx.rotate(object.rotation);
        ctx.fillText(object.emoji, 0, 0);
        ctx.restore();
      });

      palmsRef.current.forEach((palm) => {
        palm.size = Math.min(palm.size + GROWTH_SPEED, palm.targetSize);
        palm.sway += palm.swaySpeed;
        const swayOffset = Math.sin(palm.sway) * SWAY_AMPLITUDE;

        ctx.save();
        ctx.font = `${palm.size}px Arial`;
        ctx.translate(palm.x, palm.y);
        ctx.rotate(palm.angle);
        ctx.translate(swayOffset, 0);
        ctx.fillText('🌴', -palm.size / 2, 0);
        ctx.restore();
      });

      dolphinsRef.current.forEach((dolphin, index) => {
        switch (dolphin.state) {
          case 'jumping':
            dolphin.y -= dolphin.speed;
            if (dolphin.y <= dolphin.maxHeight) {
              dolphin.y = dolphin.maxHeight;
              dolphin.state = 'rotating';
            }
            break;
          case 'rotating':
            dolphin.rotation += DOLPHIN_ROTATION_SPEED * dolphin.rotationDirection;
            if (Math.abs(dolphin.rotation) >= Math.PI * 2) {
              dolphin.state = 'falling';
              dolphin.rotation = 0;
              dolphin.speed = DOLPHIN_FALL_SPEED;
            }
            break;
          case 'falling':
            dolphin.y += dolphin.speed;
            break;
        }

        if (dolphin.y > canvas.height + 50) {
          dolphinsRef.current.splice(index, 1);

          return;
        }

        ctx.save();
        ctx.font = `${dolphin.size}px Arial`;
        ctx.translate(dolphin.x, dolphin.y);
        ctx.rotate(dolphin.rotation);
        ctx.fillText('🐬', -dolphin.size / 2, dolphin.size / 2);
        ctx.restore();
      });

      if (now < fadeStart) {
        createDolphin();
      }

      if (timeLeft > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        canvas.style.transition = `opacity ${FADE_DURATION_MS}ms`;
        canvas.style.opacity = '0';
        setTimeout(() => canvas.remove(), FADE_DURATION_MS);
      }
    };

    createSummerObjects();
    createPalms(canvas);
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
