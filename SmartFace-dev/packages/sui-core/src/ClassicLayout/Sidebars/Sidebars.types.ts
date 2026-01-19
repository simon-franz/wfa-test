import type { HTMLAttributes } from 'react';

import type { ClassicLayoutProps } from '../ClassicLayout.types';

export type SidebarsProps = Pick<ClassicLayoutProps, 'header' | 'sidebar' | 'logo'> & HTMLAttributes<HTMLDivElement>;
