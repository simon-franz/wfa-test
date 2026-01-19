import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremSentences, generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';
import times from 'lodash/times';

import { patchEvent } from '../../utils/eventFunctions/patchEvent';
import { generateProps } from '../../utils/generateProps';
import { defaultBadge } from '../Badge/BadgeDefaultProps';
import { defaultFontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIconDefaultProps';
import type { SqwDropdownMenuBackendProps } from '@hrworks/smartface/adapters/application/hrworks-user/SqwDropdownMenuAdapter/SqwDropdownMenuAdapter.types';

const dropdownEntries = (count: number) => [
  ...times(
    count,
    () =>
      ({
        props: { text: generateLoremWords() },
        sfId: getId(),
        sfComponentPart: 'Entry',
      }) as const,
  ),
];

export const sqwDropdownMenuDefaultProps: SqwDropdownMenuBackendProps & {
  sfId: string;
} = (() => {
  const sfId = getId();

  return {
    icon: defaultFontAwesomeIcon(),
    title: generateLoremWords(),
    badge: defaultBadge(),
    componentParts: [
      {
        props: {
          text: 'onClick + href',
          badge: defaultBadge(),
          href: 'SqwDropdownMenu',
          componentParts: dropdownEntries(10),
          onClick: [
            patchEvent({
              operation: 'write',
              targetSfId: sfId,
              path: 'title',
              value: generateLoremSentences(),
            }),
          ],
        },
        sfId: getId(),
        sfComponentPart: 'Entry',
      },
      ...dropdownEntries(2),
    ],
    sfId,
  };
})();

export const defaultSqwDropdownMenu = (props?: SqwDropdownMenuBackendProps) =>
  generateProps('SqwDropdownMenu', { ...sqwDropdownMenuDefaultProps, ...props });
