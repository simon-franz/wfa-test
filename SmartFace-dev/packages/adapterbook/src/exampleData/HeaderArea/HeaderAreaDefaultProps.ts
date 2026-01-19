import { defaultButton } from '../Button/ButtonDefaultProps';
import { defaultFontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIconDefaultProps';
import { defaultText } from '../Text/TextDefaultProps';
import type { HeaderAreaBackendProps } from '@hrworks/smartface/adapters/extension/HeaderAreaAdapter/HeaderAreaAdapter.types';

export const headerAreaDefaultProps: HeaderAreaBackendProps = {
  title: 'HeaderArea',
  subtitle: 'I am the subtitle',
  titleSize: 'large',
  titleChildren: [defaultFontAwesomeIcon()],
  subtitleSize: 'small',
  subtitleChildren: [defaultFontAwesomeIcon()],
  fullHeight: false,
  toolbarChildren: [defaultButton()],
  componentChildren: [defaultText()],
};
