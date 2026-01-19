import { useCallback, useEffect, useRef } from 'react';

import type { BatProps, GhostProps, HalloweenVibesProps } from './HalloweenVibes.types';

const DEFAULT_DURATION_MS = 10_000;
const FADE_DURATION_MS = 2000;

//BAT
const BAT_COUNT = 10;
const BAT_COLOR = '#333';
const BAT_EYE_INNER_COLOR = '#fc0';
const BAT_EYE_OUTER_COLOR = '#c80';
const MIN_BAT_SIZE = 10;
const MAX_BAT_SIZE = 20;
const WING_FLAP_SPEED_MIN = 0.15;
const WING_FLAP_SPEED_MAX = 0.25;

// GHOST
const GHOST_COLOR = 'rgba(255, 255, 255, 0.8)';
const GHOST_EYE_COLOR = '#000';
const GHOST_SIZE = 30;
const GHOST_HOVER_AMPLITUDE = 40;
const GHOST_HOVER_SPEED = 0.05;
const GHOST_MOVEMENT_SPEED = 3;
const GHOST_LEFT_BOUND_PERCENT = 10;
const GHOST_RIGHT_BOUND_PERCENT = 90;

// BACKGROUND
const BG_COLOR_TOP = '#08db83ff';
const BG_COLOR_BOTTOM = '#01002cff';

// MOON
const MOON_COLOR = '#ffffffff';
const MOON_GLOW_COLOR = 'rgba(192, 241, 203, 0.3)';
const MOON_SIZE = 60;
const MOON_GLOW_SIZE = 30;
const MOON_X_PERCENT = 94;
const MOON_Y_PERCENT = 8;

export const HalloweenVibes = ({ zIndex, duration = DEFAULT_DURATION_MS }: HalloweenVibesProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const batsRef = useRef<BatProps[]>([]);
  const ghostRef = useRef<GhostProps | null>(null);

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

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw background radial gradient
    const drawBackground = (ctx: CanvasRenderingContext2D) => {
      // Create gradient
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.max(canvas.width, canvas.height); // Ensure gradient covers the entire screen

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0, // Start from center
        centerX,
        centerY,
        radius, // Extend to cover entire canvas
      );

      gradient.addColorStop(0.1, BG_COLOR_TOP);
      gradient.addColorStop(0.5, BG_COLOR_BOTTOM);

      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    };

    // Draw glowing moon
    const drawMoon = (ctx: CanvasRenderingContext2D) => {
      // Calculate moon position
      const moonX = (canvas.width * MOON_X_PERCENT) / 100;
      const moonY = (canvas.height * MOON_Y_PERCENT) / 100;

      ctx.save();

      // Draw the outer glow
      const glowGradient = ctx.createRadialGradient(
        moonX,
        moonY,
        MOON_SIZE * 0.7,
        moonX,
        moonY,
        MOON_SIZE + MOON_GLOW_SIZE,
      );

      glowGradient.addColorStop(0, MOON_GLOW_COLOR);
      glowGradient.addColorStop(1, 'rgba(255, 250, 230, 0)');

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(moonX, moonY, MOON_SIZE + MOON_GLOW_SIZE, 0, Math.PI * 2);
      ctx.fill();

      // Draw moon itself
      const moonGradient = ctx.createRadialGradient(
        moonX - MOON_SIZE * 0.2,
        moonY - MOON_SIZE * 0.2,
        0,
        moonX,
        moonY,
        MOON_SIZE,
      );

      moonGradient.addColorStop(0, '#f8fffbff');
      moonGradient.addColorStop(0.7, MOON_COLOR);
      moonGradient.addColorStop(1, '#ebf5e5ff');

      ctx.fillStyle = moonGradient;
      ctx.beginPath();
      ctx.arc(moonX, moonY, MOON_SIZE, 0, Math.PI * 2);
      ctx.fill();

      // Craters
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = '#000000';

      // Draw random craters
      const craters = [
        { x: moonX - MOON_SIZE * 0.2, y: moonY + MOON_SIZE * 0.3, r: MOON_SIZE * 0.15 },
        { x: moonX + MOON_SIZE * 0.4, y: moonY - MOON_SIZE * 0.2, r: MOON_SIZE * 0.1 },
        { x: moonX - MOON_SIZE * 0.3, y: moonY - MOON_SIZE * 0.4, r: MOON_SIZE * 0.12 },
        { x: moonX + MOON_SIZE * 0.1, y: moonY + MOON_SIZE * 0.2, r: MOON_SIZE * 0.08 },
      ];

      craters.forEach((crater) => {
        ctx.beginPath();
        ctx.arc(crater.x, crater.y, crater.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    // Ghost
    const createGhost = () => {
      const leftBoundary = (canvas.width * GHOST_LEFT_BOUND_PERCENT) / 100;

      return {
        x: leftBoundary, // Start at the left boundary
        y: canvas.height / 4,
        baseY: canvas.height / 4,
        size: GHOST_SIZE,
        hoverPhase: 0,
        movingRight: true,
        wavyBottom: Array.from({ length: 5 }, () => Math.random() * 0.4 + 0.8),
      };
    };

    ghostRef.current = createGhost();

    const drawGhost = (ctx: CanvasRenderingContext2D, ghost: GhostProps) => {
      ctx.save();

      ctx.translate(ghost.x, ghost.y);

      // Ghost body
      ctx.fillStyle = GHOST_COLOR;
      ctx.beginPath();

      // Top half is a semi-circle
      ctx.arc(0, 0, ghost.size, Math.PI, 0, false);

      // Draw the wavy bottom part
      const bottomWidth = ghost.size * 2;
      const segments = ghost.wavyBottom.length;
      const segmentWidth = bottomWidth / segments;

      // Start at the right side of the semi-circle
      let currentX = ghost.size;
      const currentY = 0;

      // Draw the right side down
      ctx.lineTo(currentX, currentY + ghost.size * 0.7);

      // Draw the wavy bottom
      for (let i = 0; i < segments; i++) {
        const waveFactor = ghost.wavyBottom[i];
        const nextX = currentX - segmentWidth;
        const nextY = ghost.size * waveFactor;

        // curve for each segment
        ctx.quadraticCurveTo(currentX - segmentWidth / 2, nextY - ghost.size * 0.3, nextX, nextY);

        currentX = nextX;
      }

      // Draw the left side
      ctx.lineTo(-ghost.size, 0);

      ctx.fill();

      // Eyes
      ctx.fillStyle = GHOST_EYE_COLOR;

      // Left eye
      ctx.beginPath();
      ctx.ellipse(-ghost.size * 0.3, -ghost.size * 0.2, ghost.size * 0.15, ghost.size * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();

      // Right eye
      ctx.beginPath();
      ctx.ellipse(ghost.size * 0.3, -ghost.size * 0.2, ghost.size * 0.15, ghost.size * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const updateGhost = (ghost: GhostProps) => {
      // Update hover movement
      ghost.hoverPhase += GHOST_HOVER_SPEED;
      ghost.y = ghost.baseY + Math.sin(ghost.hoverPhase) * GHOST_HOVER_AMPLITUDE;

      // Calculate position boundaries based on screen width percentages
      const leftBoundary = (canvas.width * GHOST_LEFT_BOUND_PERCENT) / 100;
      const rightBoundary = (canvas.width * GHOST_RIGHT_BOUND_PERCENT) / 100;

      // Handle horizontal movement
      if (ghost.movingRight) {
        ghost.x += GHOST_MOVEMENT_SPEED;
        // If reached the right boundary, change direction
        if (ghost.x > rightBoundary) {
          ghost.movingRight = false;
        }
      } else {
        ghost.x -= GHOST_MOVEMENT_SPEED;
        // If reached the left boundary, change direction
        if (ghost.x < leftBoundary) {
          ghost.movingRight = true;
        }
      }
    };

    // Create Bats
    const createBats = () => {
      const bats: BatProps[] = [];
      for (let i = 0; i < BAT_COUNT; i++) {
        const size = randomInRange(MIN_BAT_SIZE, MAX_BAT_SIZE);
        const wingSpan = size * 4;

        // Calculate Path
        const path = [];
        // Startpoint left off-screen
        path.push({ x: -size * 2, y: randomInRange(0, canvas.height) });

        // Wander Points
        for (let j = 0; j < 4; j++) {
          path.push({
            x: randomInRange(0, canvas.width),
            y: randomInRange(0, canvas.height * 0.7),
          });
        }

        // Endpoint right off-screen
        path.push({
          x: canvas.width + size * 2,
          y: randomInRange(canvas.height * 0.3, canvas.height),
        });

        bats.push({
          x: path[0].x,
          y: path[0].y,
          size,
          speed: randomInRange(1, 2.5),
          wingSpan,
          wingPhase: Math.random() * Math.PI * 2,
          wingSpeed: randomInRange(WING_FLAP_SPEED_MIN, WING_FLAP_SPEED_MAX),
          path,
          currentPathIndex: 0,
        });
      }

      return bats;
    };

    batsRef.current = createBats();

    const drawBat = (ctx: CanvasRenderingContext2D, bat: BatProps) => {
      ctx.save();

      // Move
      ctx.translate(bat.x, bat.y);

      const bodyWidth = bat.size;
      const bodyHeight = bat.size * 1.2; // Leicht oval

      // Flapping-Animation
      const wingAngle = (Math.sin(bat.wingPhase) * Math.PI) / 4; // ±45 Grad Flügelschlag

      // Symmetric Wing with jaggy edges
      const drawWing = (isLeft: boolean) => {
        ctx.save();

        // Rotate up and down
        ctx.rotate(isLeft ? wingAngle : -wingAngle);

        const scale = isLeft ? -1 : 1; // Mirror wings
        const wingWidth = bat.wingSpan / 2;
        const wingHeight = bat.size * 1.6;

        // draw edges
        ctx.fillStyle = BAT_COLOR;
        ctx.beginPath();

        // move to body
        ctx.moveTo(0, 0);

        // upper wing - soft curve
        ctx.quadraticCurveTo(scale * wingWidth * 0.5, -wingHeight * 0.8, scale * wingWidth, -wingHeight * 0.3);

        // lower wing edgy
        ctx.lineTo(scale * wingWidth * 0.9, wingHeight * 0.1);
        ctx.lineTo(scale * wingWidth * 0.7, -wingHeight * 0.1);
        ctx.lineTo(scale * wingWidth * 0.6, wingHeight * 0.3);
        ctx.lineTo(scale * wingWidth * 0.4, wingHeight * 0.1);
        ctx.lineTo(scale * wingWidth * 0.3, wingHeight * 0.4);
        ctx.lineTo(scale * wingWidth * 0.1, wingHeight * 0.2);
        ctx.lineTo(0, 0);

        ctx.fill();
        ctx.restore();
      };

      // draw wings
      drawWing(true); // left
      drawWing(false); // right

      // body (oval)
      ctx.fillStyle = BAT_COLOR;
      ctx.beginPath();
      ctx.ellipse(0, 0, bodyWidth / 2, bodyHeight / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // eyes
      const drawEye = (x: number) => {
        const gradient = ctx.createRadialGradient(x, -bodyHeight / 5, 0, x, -bodyHeight / 5, bodyWidth / 10);
        gradient.addColorStop(0, BAT_EYE_INNER_COLOR);
        gradient.addColorStop(0.5, BAT_EYE_INNER_COLOR);
        gradient.addColorStop(1, BAT_EYE_OUTER_COLOR);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, -bodyHeight / 5, bodyWidth / 10, 0, Math.PI * 2);
        ctx.fill();
      };

      // left and right eye
      drawEye(-bodyWidth / 4);
      drawEye(bodyWidth / 4);

      ctx.restore();
    };

    const updateBat = (bat: BatProps) => {
      // Update wing animation
      bat.wingPhase += bat.wingSpeed;

      // move bats along path points
      if (bat.currentPathIndex < bat.path.length - 1) {
        const nextPoint = bat.path[bat.currentPathIndex + 1];

        const dx = nextPoint.x - bat.x;
        const dy = nextPoint.y - bat.y;
        const distance = Math.hypot(dx, dy);

        if (distance < bat.speed) {
          bat.currentPathIndex++;
        } else {
          bat.x += (dx / distance) * bat.speed;
          bat.y += (dy / distance) * bat.speed;
        }
      }
    };

    const animationEnd = Date.now() + duration;
    const fadeStart = animationEnd - FADE_DURATION_MS;

    const animate = () => {
      const now = Date.now();
      const timeLeft = animationEnd - now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground(ctx);
      drawMoon(ctx);
      if (ghostRef.current) {
        updateGhost(ghostRef.current);
        drawGhost(ctx, ghostRef.current);
      }

      batsRef.current.forEach((bat) => {
        drawBat(ctx, bat);
        updateBat(bat);
      });

      if (now >= fadeStart) {
        const opacity = timeLeft / FADE_DURATION_MS;
        canvas.style.opacity = opacity.toString();
      }

      if (timeLeft > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (document.body.contains(canvas)) {
        canvas.remove();
      }
    };
  }, [zIndex, duration, randomInRange]);

  return null;
};
