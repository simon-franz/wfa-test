import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type AfterEffectsMediaBackendProps = {
  url: string;
  speed?: number;
  loop?: boolean;
  loopStartFrame?: number;
  loopEndFrame?: number;
  paint?: {
    [part in 'path' | 'ellipse' | 'line' | 'polyline']?: {
      stroke?: boolean;
      fill?: boolean;
    };
  };
  alt?: string;
};

export type AfterEffectsMediaBackendDefinition = SmartFaceBackendComponent<
  'AfterEffectsMedia',
  AfterEffectsMediaBackendProps
>;

export type AfterEffectsMediaAdapterProps = SmartFaceAdapterPropsType<AfterEffectsMediaBackendDefinition>;
