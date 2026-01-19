import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremSentences, generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { patchEvent } from '../../utils/eventFunctions/patchEvent';
import { generateProps } from '../../utils/generateProps';
import { dropdownMenuDefaultProps } from '../DropdownMenu/DropdownMenuDefaultProps';
import { defaultFontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIconDefaultProps';
import type { SqwClockInButtonBackendProps } from '@hrworks/smartface/adapters/application/hrworks-user/SqwClockInButtonAdapter/SqwClockInButtonAdapter.types';

const getNow = () => new Date().toISOString();

const getTimeString = () => {
  const now = new Date();

  return `seit ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} Uhr`;
};

const clockInEvents = (targetSfId: string, label?: string) => [
  ...(label ? [patchEvent({ operation: 'write', targetSfId, path: 'projectOrActivityLabel', value: label })] : []),
  patchEvent({ operation: 'write', targetSfId, path: 'isActive', value: true }),
  patchEvent({ operation: 'write', targetSfId, path: 'startDateTime', value: getNow() }),
  patchEvent({ operation: 'write', targetSfId, path: 'label', value: getTimeString() }),
];

export const sqwClockInButtonDefaultProps: SqwClockInButtonBackendProps & {
  sfId: string;
} = (() => {
  const sfId = getId();

  const DropdownMenu = generateProps('DropdownMenu', {
    ...dropdownMenuDefaultProps,
    placement: 'bottom',
    presentation: 'dropdown',
    trigger: defaultFontAwesomeIcon({ name: 'caret-down', variant: 'solid' }),
    componentParts: [
      {
        props: {
          text: generateLoremSentences(),
          onClick: clockInEvents(sfId, generateLoremSentences()),
        },
        sfComponentPart: 'Entry',
        sfId: getId(),
      },
      {
        props: {
          text: generateLoremWords(),
          onClick: clockInEvents(sfId, generateLoremWords()),
        },
        sfComponentPart: 'Entry',
        sfId: getId(),
      },
    ],
  });

  return {
    label: 'seit 09:00',
    startDateTime: '2025-03-24T14:15:00+02:00',
    isActive: false,
    onClockIn: clockInEvents(sfId),
    onClockOut: [patchEvent({ targetSfId: sfId, operation: 'write', path: 'isActive', value: false })],
    projectOrActivityLabel: generateLoremWords(4),
    projectOrActivityDropdown: DropdownMenu,
    sfId,
  };
})();

export const defaultSqwClockInButton = (props?: SqwClockInButtonBackendProps) =>
  generateProps('SqwClockInButton', { ...sqwClockInButtonDefaultProps, ...props });
