import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type OverlayEffectBackendProps = {
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

export type OverlayEffectBackendDefinition = SmartFaceBackendComponent<'OverlayEffect', OverlayEffectBackendProps>;

export type OverlayEffectAdapterProps = SmartFaceAdapterPropsType<OverlayEffectBackendDefinition>;
