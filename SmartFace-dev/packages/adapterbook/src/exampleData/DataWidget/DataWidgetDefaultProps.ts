import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { defaultFontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIconDefaultProps';
import { defaultText } from '../Text/TextDefaultProps';
import type { DataWidgetBackendProps } from '@hrworks/smartface/adapters/application/hrworks-admin/DataWidgetAdapter/DataWidgetAdapter.types';

export const dataWidgetDefaultProps: DataWidgetBackendProps = {
  label: generateLoremWords(),
  value: generateLoremWords(1),
  icon: defaultFontAwesomeIcon(),
  descriptionChildren: [defaultText()],
};
