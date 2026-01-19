import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../../types/SmartFaceComponent';

export type HrworksAdminLayoutProfileImageBackendProps = {
  src: string;
  alt?: string;
};

export type HrworksAdminLayoutProfileImageBackendDefinition = SmartFaceBackendComponent<
  'HrworksAdminLayoutProfileImage',
  HrworksAdminLayoutProfileImageBackendProps
>;

export type HrworksAdminLayoutProfileImageAdapterProps =
  SmartFaceAdapterPropsType<HrworksAdminLayoutProfileImageBackendDefinition>;
