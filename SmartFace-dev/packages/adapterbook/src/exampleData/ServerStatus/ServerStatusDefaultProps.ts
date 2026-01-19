import { generateLoremSentences, generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { defaultFontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIconDefaultProps';
import type { ServerStatusBackendProps } from '@hrworks/smartface/adapters/core/ServerStatusAdapter/ServerStatusAdapter.types';

export const serverStatusDefaultProps: ServerStatusBackendProps = {
  title: generateLoremWords(),
  subtitle: generateLoremSentences(),
  statusCode: generateLoremWords(1),
  media: defaultFontAwesomeIcon(),
};
