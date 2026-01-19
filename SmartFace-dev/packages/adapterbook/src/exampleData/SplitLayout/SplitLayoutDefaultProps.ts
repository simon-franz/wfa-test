import { preset } from '../../utils/preset';
import { defaultCard } from '../Card/CardDefaultProps';
import type { SplitLayoutBackendProps } from '@hrworks/smartface/adapters/extension/SplitLayoutAdapter/SplitLayoutAdapter.types';

export const splitLayoutDefaultProps: SplitLayoutBackendProps = {
  logo: preset.logoDefaultProps,
  componentChildren: [defaultCard({ fullHeight: true })],
  expandSidebar: false,
};
