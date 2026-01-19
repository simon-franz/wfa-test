import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../types/SmartFaceComponent';

type AudioSideEffectPropsType = {
  src: string;
  loop?: boolean;
  volume?: number;
};

export type AudioSideEffectBackendType = SmartFaceBackendComponent<'Audio', AudioSideEffectPropsType>;

export type AudioSideEffectAdapterPropsType = SmartFaceAdapterPropsType<AudioSideEffectBackendType>;
