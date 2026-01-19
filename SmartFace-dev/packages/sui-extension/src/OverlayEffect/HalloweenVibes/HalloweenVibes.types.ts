export type HalloweenVibesProps = {
  zIndex: number;
  duration?: number;
};

export type BatProps = {
  x: number;
  y: number;
  size: number;
  speed: number;
  wingSpan: number;
  wingPhase: number;
  wingSpeed: number;
  path: { x: number; y: number }[];
  currentPathIndex: number;
};

export type GhostProps = {
  x: number;
  y: number;
  baseY: number;
  size: number;
  hoverPhase: number;
  movingRight: boolean;
  wavyBottom: number[];
};
