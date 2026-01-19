import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { preset } from '../../utils/preset';
import { defaultButton } from '../Button/ButtonDefaultProps';
import { defaultText } from '../Text/TextDefaultProps';
import type { HrworksAdminLayoutBackendProps } from '@hrworks/smartface/adapters/application/hrworks-admin/HrworksAdminLayoutAdapter/HrworksAdminLayoutAdapter.types';

export const hrworksAdminLayoutDefaultProps: HrworksAdminLayoutBackendProps = (() => {
  const activeNavigationItemSfId = getId();

  return {
    activeNavigationItemSfId,
    header: {
      logo: preset.logoDefaultProps,
      navigationItems: [
        { text: generateLoremWords(), sfId: activeNavigationItemSfId, href: '/HrworksAdminLayout' },
        { text: generateLoremWords(), sfId: getId() },
      ],
      componentChildren: [defaultButton()],
    },
    contentHeaderChildren: [defaultButton()],
    contentChildren: [defaultText()],
  };
})();
