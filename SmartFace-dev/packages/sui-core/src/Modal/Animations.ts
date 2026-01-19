import type { ModalAnimationDirections } from './Modal.types';

type AnimationParams = {
  top?: string;
  translateY?: string;
  left?: string;
  translateX?: string;
  scale?: number;
  opacity?: number;
};

type AnimationCollection = {
  [key in ModalAnimationDirections]: AnimationParams;
};

const topDefault = { top: '50%', translateY: '-50%', opacity: 0 };
const sideDefault = { left: '50%', translateX: '-50%', opacity: 0 };
const directionAnimations = {
  top: {
    top: '-100%',
    ...sideDefault,
  },
  bottom: {
    top: '100%',
    ...sideDefault,
  },
  left: {
    left: '-100%',
    ...topDefault,
  },
  right: {
    left: '100%',
    ...topDefault,
  },
};
export const entryAnimationCollection: AnimationCollection = {
  ...directionAnimations,
  grow: {
    scale: 0.9,
    ...topDefault,
    ...sideDefault,
  },
  shrink: {
    scale: 1.2,
    ...topDefault,
    ...sideDefault,
  },
};
export const exitAnimationCollection: AnimationCollection = {
  ...directionAnimations,
  grow: {
    scale: 1.2,
    ...topDefault,
    ...sideDefault,
  },
  shrink: {
    scale: 0.9,
    ...topDefault,
    ...sideDefault,
  },
};
