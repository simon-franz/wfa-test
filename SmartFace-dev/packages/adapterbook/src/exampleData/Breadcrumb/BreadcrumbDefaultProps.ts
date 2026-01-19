import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import type { BreadcrumbBackendProps } from '@hrworks/smartface/adapters/core/BreadcrumbAdapter/BreadcrumbAdapter.types';

export const breadcrumbDefaultProps: BreadcrumbBackendProps = {
  items: [
    {
      props: {
        text: generateLoremWords(),
      },
      sfId: getId(),
    },
    {
      props: {
        text: generateLoremWords(),
        href: 'Breadcrumb',
      },
      sfId: getId(),
    },
  ],
  size: 'large',
};
