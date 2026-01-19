import { defaultText } from '../Text/TextDefaultProps';
import type { UiHandlerBackendProps } from '@hrworks/smartface/adapters/core/UiHandlerAdapter/UiHandlerAdapter.types';

export const uiHandlerDefaultProps: UiHandlerBackendProps = {
  defaultFullHeight: false,
  iconSet: 'font-awesome',
  defaultSize: 'large',
  theme: 'light',
  useCustomScrollbars: false,
  componentChildren: [defaultText()],
};
