import { observer } from 'mobx-react';

import { SVGIcon } from '../Icon';
import type { MaterialDesignIconProps } from './MaterialDesignIcon.types';

const baseUrl = 'https://d1aq704nlrqnkz.cloudfront.net/icons/material-design-icons/material-design-svg/svgs';

export const MaterialDesignIcon = observer(({ name, variant = 'filled', ...otherProps }: MaterialDesignIconProps) => (
  <SVGIcon src={`${baseUrl}/${variant}/${name}.svg`} {...otherProps} />
));
