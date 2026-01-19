import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { preset } from '../../utils/preset';
import { defaultImage } from '../Image/ImageDefaultProps';
import { defaultText } from '../Text/TextDefaultProps';
import type { ProfileMenuBackendProps } from '@hrworks/smartface/adapters/extension/ProfileMenuAdapter/ProfileMenuAdapter.types';

export const profileMenuDefaultProps: ProfileMenuBackendProps = {
  title: generateLoremWords(),
  subtitle: generateLoremWords(),
  placement: 'top-start',
  headerChildren: [defaultText()],
  bodyChildren: [defaultText()],
  trigger: defaultImage(),
  portrait: { src: preset.getImageUrl() },
};
