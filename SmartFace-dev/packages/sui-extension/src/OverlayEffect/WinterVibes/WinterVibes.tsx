import { useCallback, useEffect, useRef } from 'react';

import type { Snowflake, WinterVibesProps } from './WinterVibes.types';

const DEFAULT_DURATION_MS = 12_000;
const FADE_DURATION_MS = 3000;
const FLAKE_COUNT = 150;
const MIN_FLAKE_SIZE = 3;
const MAX_FLAKE_SIZE = 8;
const MIN_EMOJI_SIZE = 20;
const MAX_EMOJI_SIZE = 40;
const MIN_FLAKE_SPEED = 1;
const MAX_FLAKE_SPEED = 1.5;
const MIN_WOBBLE_SPEED = 0.02;
const MAX_WOBBLE_SPEED = 0.05;
const MIN_ROTATION_SPEED = 0.01;
const MAX_ROTATION_SPEED = 0.03;
const MIN_FLAKE_OPACITY = 0.7;
const MAX_FLAKE_OPACITY = 1;
const WOBBLE_AMPLITUDE = 4;
const SHADOW_BLUR = 2;
const SHADOW_OFFSET = 1;
const TRANSITION_DURATION_MS = 1000;

const SNOWFLAKE_EMOJIS = ['❅', '❆'];

const FLAKE_COLORS = ['rgba(255, 255, 255, 1)', 'rgba(243, 251, 253, 0.833)', 'rgba(231, 244, 245, 0.828)'];

export const WinterVibes = ({ zIndex, duration = DEFAULT_DURATION_MS }: WinterVibesProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const snowflakesRef = useRef<Snowflake[]>([]);
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

    const createSnowflakes = () => {
      snowflakesRef.current = [];
      for (let i = 0; i < FLAKE_COUNT; i++) {
        const isEmoji = Math.random() < 0.2;
        snowflakesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          size: isEmoji ? randomInRange(MIN_EMOJI_SIZE, MAX_EMOJI_SIZE) : randomInRange(MIN_FLAKE_SIZE, MAX_FLAKE_SIZE),
          speed: randomInRange(MIN_FLAKE_SPEED, MAX_FLAKE_SPEED),
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: randomInRange(MIN_WOBBLE_SPEED, MAX_WOBBLE_SPEED),
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: randomInRange(MIN_ROTATION_SPEED, MAX_ROTATION_SPEED),
          color: FLAKE_COLORS[Math.floor(Math.random() * FLAKE_COLORS.length)],
          opacity: randomInRange(MIN_FLAKE_OPACITY, MAX_FLAKE_OPACITY),
          emoji: isEmoji ? SNOWFLAKE_EMOJIS[Math.floor(Math.random() * SNOWFLAKE_EMOJIS.length)] : undefined,
        });
      }
    };

    const animationEnd = Date.now() + duration;
    const fadeStart = animationEnd - FADE_DURATION_MS;

    const drawAndMoveSnowflakes = () => {
      const now = Date.now();
      const timeLeft = animationEnd - now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakesRef.current.forEach((flake) => {
        flake.y += flake.speed;
        flake.wobble += flake.wobbleSpeed;
        flake.rotation += flake.rotationSpeed;
        const wobbleX = Math.sin(flake.wobble) * WOBBLE_AMPLITUDE;

        let opacity = flake.opacity;
        if (now > fadeStart) {
          opacity *= Math.max(0, (animationEnd - now) / FADE_DURATION_MS);
        }

        ctx.save();
        ctx.shadowColor = `rgba(48, 45, 69, 0.8)`;
        ctx.shadowBlur = SHADOW_BLUR;
        ctx.shadowOffsetX = SHADOW_OFFSET;
        ctx.shadowOffsetY = SHADOW_OFFSET;

        if (flake.emoji) {
          ctx.font = `${flake.size}px Arial`;
          ctx.fillStyle = flake.color.replace('1)', `${opacity})`);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.translate(flake.x + wobbleX, flake.y);
          ctx.rotate(flake.rotation);
          ctx.fillText(flake.emoji, 0, 0);
        } else {
          ctx.beginPath();
          ctx.fillStyle = flake.color.replace('1)', `${opacity})`);
          ctx.arc(flake.x + wobbleX, flake.y, flake.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        if (flake.y > canvas.height) {
          flake.y = -flake.size;
          flake.x = Math.random() * canvas.width;
        }
      });

      if (timeLeft > 0) {
        animationFrameRef.current = requestAnimationFrame(drawAndMoveSnowflakes);
      } else {
        canvas.style.transition = `opacity ${TRANSITION_DURATION_MS}ms`;
        canvas.style.opacity = '0';
        setTimeout(() => canvas.remove(), TRANSITION_DURATION_MS);
      }
    };

    resizeCanvas();
    createSnowflakes();
    drawAndMoveSnowflakes();

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
