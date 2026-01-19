import { defaultButton } from '../Button/ButtonDefaultProps';
import { defaultText } from '../Text/TextDefaultProps';
import type { ClassicLayoutBackendProps } from '@hrworks/smartface/adapters/core/ClassicLayoutAdapter/ClassicLayoutAdapter.types';

export const classicLayoutDefaultProps: ClassicLayoutBackendProps = {
  header: { flexComponentChildren: [defaultButton()] },
  content: {
    componentChildren: [defaultText()],
  },
  desktopSidebarTogglerMode: 'fully-collapse',
};
