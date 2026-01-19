import { defaultText } from '../Text/TextDefaultProps';
import type { LoadingOverlayBackendProps } from '@hrworks/smartface/adapters/core/LoadingOverlayAdapter/LoadingOverlayAdapter.types';

export const loadingOverlayDefaultProps: LoadingOverlayBackendProps = {
  loading: true,
  type: 'spinner',
  blurIntensity: 'medium',
  fadeIntensity: 'medium',
  componentChildren: [defaultText()],
};
