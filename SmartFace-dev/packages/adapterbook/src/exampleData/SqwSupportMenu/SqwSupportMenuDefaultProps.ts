import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { defaultText } from '../Text/TextDefaultProps';
import type { SqwSupportMenuBackendProps } from '@hrworks/smartface/adapters/application/hrworks-user/SqwSupportMenuAdapter/SqwSupportMenuAdapter.types';

export const sqwSupportMenuDefaultProps: SqwSupportMenuBackendProps = {
  title: generateLoremWords(),
  subtitle: generateLoremWords(),
  componentChildren: [defaultText()],
};
