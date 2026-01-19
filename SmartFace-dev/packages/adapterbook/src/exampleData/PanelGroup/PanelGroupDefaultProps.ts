import getId from '@hrworks/sui-shared/functions/getId';

import { preset } from '../../utils/preset';
import { defaultImage } from '../Image/ImageDefaultProps';
import type { PanelGroupBackendProps } from '@hrworks/smartface/adapters/extension/PanelGroupAdapter/PanelGroupAdapter.types';

export const panelGroupDefaultProps: PanelGroupBackendProps = {
  defaultThreshold: 'medium',
  direction: 'horizontal',
  fullHeight: false,
  items: [
    {
      props: {
        componentChildren: [defaultImage()],
      },
      sfComponentPart: 'Item',
      sfId: getId(),
    },
    {
      props: {
        componentChildren: [defaultImage({ src: preset.getImageUrl(800, 800) })],
      },
      sfComponentPart: 'Item',
      sfId: getId(),
    },
  ],
};
