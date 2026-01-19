export type VacationVibesProps = {
  zIndex: number;
  duration?: number;
};

export type SummerObject = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  emoji: string;
  rotation: number;
  rotationSpeed: number;
};

export type Dolphin = {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  state: 'jumping' | 'rotating' | 'falling';
  maxHeight: number;
  rotationDirection: number;
};

export type Palm = {
  x: number;
  y: number;
  size: number;
  targetSize: number;
  sway: number;
  swaySpeed: number;
  initialX: number;
  initialY: number;
  maxX: number;
  maxY: number;
  angle: number;
};
