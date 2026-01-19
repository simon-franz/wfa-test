import { generateLoremSentences } from '@hrworks/sui-shared/functions/stringGenerator';

import { generateProps } from '../../utils/generateProps';
import { defaultText } from '../Text/TextDefaultProps';
import type { CardBackendProps } from '@hrworks/smartface/adapters/core/CardAdapter/CardAdapter.types';

export const cardDefaultProps: CardBackendProps = {
  title: generateLoremSentences(),
  subtitle: generateLoremSentences(),
  fullHeight: false,
  bodyChildren: [defaultText()],
};

export const defaultCard = (props?: CardBackendProps) => generateProps('Card', { ...cardDefaultProps, ...props });
