import { defaultButton } from '../Button/ButtonDefaultProps';
import type { SizeHandlerBackendProps } from '@hrworks/smartface/adapters/core/SizeHandlerAdapter/SizeHandlerAdapter.types';

export const sizeHandlerDefaultProps: SizeHandlerBackendProps = {
  height: 'auto',
  width: 200,
  maxWidth: '100%',
  componentChildren: [defaultButton({ text: 'Width', fullWidth: true })],
};
