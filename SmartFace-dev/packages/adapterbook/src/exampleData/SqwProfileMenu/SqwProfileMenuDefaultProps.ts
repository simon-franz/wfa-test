import { generateLoremSentences, generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { generateProps } from '../../utils/generateProps';
import { defaultImage } from '../Image/ImageDefaultProps';
import { defaultText } from '../Text/TextDefaultProps';
import type { SqwProfileMenuBackendProps } from '@hrworks/smartface/adapters/application/hrworks-user/SqwProfileMenuAdapter/SqwProfileMenuAdapter.types';

export const sqwProfileMenuDefaultProps: SqwProfileMenuBackendProps = {
  username: generateLoremWords(),
  email: generateLoremSentences(),
  portrait: defaultImage(),
  onPortraitAction: [addNotification()],
  componentChildren: [defaultText()],
};

export const defaultSqwProfileMenu = (props?: SqwProfileMenuBackendProps) =>
  generateProps('SqwProfileMenu', { ...sqwProfileMenuDefaultProps, ...props });
