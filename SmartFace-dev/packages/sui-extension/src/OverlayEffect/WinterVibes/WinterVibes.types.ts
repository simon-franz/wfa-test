export type WinterVibesProps = {
  zIndex: number;
  duration?: number;
};

export type Snowflake = {
  x: number;
  y: number;
  size: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  emoji?: string;
};
