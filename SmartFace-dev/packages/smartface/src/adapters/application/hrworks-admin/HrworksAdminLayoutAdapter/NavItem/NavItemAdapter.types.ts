import type { OnClickLinkBackendProps } from '../../../../../types/shared/BackendTypes';

export type NavItemBackendProps = OnClickLinkBackendProps & {
  text: string;
  activeNavigationItemId?: string;
  sfId: string;
};
