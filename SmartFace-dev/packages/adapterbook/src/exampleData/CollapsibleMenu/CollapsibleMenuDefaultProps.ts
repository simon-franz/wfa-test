import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremSentences } from '@hrworks/sui-shared/functions/stringGenerator';

import { patchEvent } from '../../utils/eventFunctions/patchEvent';
import { generateProps } from '../../utils/generateProps';
import { defaultBadge } from '../Badge/BadgeDefaultProps';
import { defaultFontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIconDefaultProps';
import type { CollapsibleMenuBackendProps } from '@hrworks/smartface/adapters/core/CollapsibleMenuAdapter/CollapsibleMenuAdapter.types';

export const collapsibleMenuDefaultProps: CollapsibleMenuBackendProps = {
  expandedEntrySfIds: ['entry-1'],
  componentParts: [
    {
      props: {
        text: 'Expandable',
        componentParts: [
          {
            props: {
              text: 'Badge & Icon',
              badge: defaultBadge(),
              icon: defaultFontAwesomeIcon(),
            },
            sfId: getId(),
            sfComponentPart: 'Entry',
          },
          {
            props: {
              text: 'onClick',
              onClick: [patchEvent({ operation: 'write', targetSfId: 'node', path: 'text', value: 'Changed' })],
            },
            sfId: 'node',
            sfComponentPart: 'Entry',
          },
          {
            props: {
              text: 'href _blank',
              href: 'CollapsibleMenu',
              target: '_blank',
            },
            sfId: getId(),
            sfComponentPart: 'Entry',
          },
        ],
      },
      sfComponentPart: 'Entry',
      sfId: 'entry-1',
    },
    {
      props: {
        text: generateLoremSentences(),
      },
      sfComponentPart: 'Entry',
      sfId: getId(),
    },
    {
      props: {
        text: generateLoremSentences(),
      },
      sfComponentPart: 'Entry',
      sfId: getId(),
    },
  ],
  multiple: true,
  activeEntrySfId: 'entry-1',
};

export const defaultCollapsibleMenu = (props?: CollapsibleMenuBackendProps) =>
  generateProps('CollapsibleMenu', { ...collapsibleMenuDefaultProps, ...props });
