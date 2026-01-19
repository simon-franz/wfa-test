import type { HTMLAttributes } from 'react';

import type { PageProps } from '../../Page/Page.types';

export type NotificationsProps = Pick<PageProps, 'notifications'> & HTMLAttributes<HTMLDivElement>;
