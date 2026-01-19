import getId from '@hrworks/sui-shared/functions/getId';
import times from 'lodash/times';

import { preset } from '../../utils/preset';
import { defaultCard } from '../Card/CardDefaultProps';
import { defaultCollapsibleMenu } from '../CollapsibleMenu/CollapsibleMenuDefaultProps';
import { defaultSqwClockInButton } from '../SqwClockInButton/SqwClockInButtonDefaultProps';
import { defaultSqwDropdownMenu } from '../SqwDropdownMenu/SqwDropdownMenuDefaultProps';
import { defaultSqwProfileMenu } from '../SqwProfileMenu/SqwProfileMenuDefaultProps';
import { sqwSupportMenuDefaultProps } from '../SqwSupportMenu/SqwSupportMenuDefaultProps';
import type { SqwLayoutBackendProps } from '@hrworks/smartface/adapters/application/hrworks-user/SqwLayoutAdapter/SqwLayoutAdapter.types';

export const sqwLayoutDefaultProps: SqwLayoutBackendProps = {
  header: {
    clockInButton: defaultSqwClockInButton(),
    supportMenu: {
      ...sqwSupportMenuDefaultProps,
      sfId: 'support-menu',
      sfComponent: 'SqwSupportMenu',
    },
    profileMenu: defaultSqwProfileMenu(),
    logo: preset.logoDefaultProps,
    dropdowns: [defaultSqwDropdownMenu(), defaultSqwDropdownMenu()],
  },
  sidebarChildren: [defaultCollapsibleMenu()],
  contentChildren: [
    {
      sfComponent: 'Grid',
      props: {
        items: [
          ...times(6, () => ({ props: { size: 4 as const, componentChildren: [defaultCard()] }, sfId: getId() })),
        ],
      },
      sfId: getId(),
    },
  ],
};
