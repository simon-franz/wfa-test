import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';
import times from 'lodash/times';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { preset } from '../../utils/preset';
import { defaultDropdownMenu } from '../DropdownMenu/DropdownMenuDefaultProps';
import { defaultIconButton } from '../IconButton/IconButtonDefaultProps';
import type { TreeGraphBackendProps } from '@hrworks/smartface/adapters/extension/TreeGraphAdapter/TreeGraphAdapter.types';

export const treeGraphDefaultProps: TreeGraphBackendProps = {
  showMiniMap: true,
  showControls: true,
  controlsChildren: [defaultDropdownMenu({ trigger: defaultIconButton(), placement: 'top' })],
  entries: [
    {
      props: {
        onClick: [addNotification()],
        title: generateLoremWords(),
        subtitle: generateLoremWords(),
        subsubtitle: generateLoremWords(),
        entries: times(4, (count) => ({
          props: {
            title: count + ' ' + generateLoremWords(),
            subtitle: generateLoremWords(),
            subsubtitle: generateLoremWords(),
          },
          sfId: getId(),
        })),
      },
      sfId: getId(),
    },
    ...times(4, (count) => ({
      props: {
        imageSrc: preset.getImageUrl(),
        title: count + ' ' + generateLoremWords(),
        subtitle: generateLoremWords(),
        subsubtitle: generateLoremWords(),
      },
      sfId: getId(),
    })),
  ],
};
