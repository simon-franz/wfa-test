export type OverlayEffectProps = {
  show?: boolean;
  effect?:
    | 'confetti'
    | 'confetti-fireworks'
    | 'autumn-vibes'
    | 'winter-vibes'
    | 'spring-vibes'
    | 'summer-vibes'
    | 'vacation-vibes'
    | 'rocket-fireworks'
    | 'halloween-vibes';
  duration?: number;
};
