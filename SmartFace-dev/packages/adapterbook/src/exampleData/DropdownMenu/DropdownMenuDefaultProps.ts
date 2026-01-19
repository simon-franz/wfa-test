import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { patchEvent } from '../../utils/eventFunctions/patchEvent';
import { generateProps } from '../../utils/generateProps';
import { defaultButton } from '../Button/ButtonDefaultProps';
import type { DropdownMenuBackendProps } from '@hrworks/smartface/adapters/core/DropdownMenuAdapter/DropdownMenuAdapter.types';

export const dropdownMenuDefaultProps: DropdownMenuBackendProps = {
  title: generateLoremWords(),
  presentation: 'dropdown',
  placement: 'bottom',
  trigger: defaultButton({ onClick: undefined }),
  componentParts: [
    {
      props: {
        title: generateLoremWords(),
        componentParts: [
          {
            props: {
              text: generateLoremWords(),
              href: 'DropdownMenu',
            },
            sfId: getId(),
            sfComponentPart: 'Entry',
          },
          {
            props: {
              text: generateLoremWords(6),
              href: 'DropdownMenu',
            },
            sfId: getId(),
            sfComponentPart: 'Entry',
          },
          {
            props: {
              text: 'onClick',
              href: 'DropdownMenu',
              onClick: [
                patchEvent({ operation: 'write', path: 'text', value: generateLoremWords(), targetSfId: 'entry' }),
              ],
            },
            sfId: 'entry',
            sfComponentPart: 'Entry',
          },
        ],
      },
      sfId: getId(),
      sfComponentPart: 'Section',
    },
  ],
};

export const defaultDropdownMenu = (props?: Partial<DropdownMenuBackendProps>) =>
  generateProps('DropdownMenu', { ...dropdownMenuDefaultProps, ...props });
