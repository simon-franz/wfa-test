import { defaultText } from '../Text/TextDefaultProps';
import type { VisibilityHandlerBackendProps } from '@hrworks/smartface/adapters/core/VisibilityHandlerAdapter/VisibilityHandlerAdapter.types';

export const visibilityHandlerDefaultProps: VisibilityHandlerBackendProps = {
  visible: true,
  componentChildren: [defaultText()],
};
