import Button from '@hrworks/sui-core/Button';
import Tooltip from '@hrworks/sui-core/Tooltip';

import type { ButtonWithTooltipProps } from './ButtonWithTooltip.types';

export const ButtonWithTooltip = ({ tooltipText, onClick, children, ...otherProps }: ButtonWithTooltipProps) => (
  <Tooltip text={tooltipText} mainAxisOffset={20} {...otherProps}>
    <Button variant="subtle" size="small" onClick={onClick}>
      {children}
    </Button>
  </Tooltip>
);
