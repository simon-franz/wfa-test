import { generateLoremSentences, generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { defaultButton } from '../Button/ButtonDefaultProps';
import type { TooltipBackendProps } from '@hrworks/smartface/adapters/core/TooltipAdapter/TooltipAdapter.types';

export const tooltipDefaultProps: TooltipBackendProps = {
  title: generateLoremWords(),
  text: generateLoremSentences(),
  fullWidth: false,
  placement: 'right-end',
  trigger: 'hoverOrTouch',
  componentChildren: [defaultButton()],
};
