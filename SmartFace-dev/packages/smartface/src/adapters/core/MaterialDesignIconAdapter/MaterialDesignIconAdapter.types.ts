import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type MaterialDesignIconBackendProps = {
  name: string;
  variant?: 'filled' | 'outlined' | 'round' | 'sharp' | 'two-tone';
};

export type MaterialDesignIconBackendDefinition = SmartFaceBackendComponent<
  'MaterialDesignIcon',
  MaterialDesignIconBackendProps
>;

export type MaterialDesignIconAdapterProps = SmartFaceAdapterPropsType<MaterialDesignIconBackendDefinition>;
