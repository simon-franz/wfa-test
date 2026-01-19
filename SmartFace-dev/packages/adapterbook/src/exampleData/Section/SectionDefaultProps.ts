import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { defaultFontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIconDefaultProps';
import { defaultText } from '../Text/TextDefaultProps';
import type { SectionBackendProps } from '@hrworks/smartface/adapters/core/SectionAdapter/SectionAdapter.types';

export const sectionDefaultProps: SectionBackendProps = {
  title: generateLoremWords(),
  divider: true,
  titleChildren: [defaultFontAwesomeIcon(), defaultFontAwesomeIcon()],
  collapsible: true,
  componentChildren: [defaultText()],
};
