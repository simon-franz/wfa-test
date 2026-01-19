import Tooltip from '@hrworks/sui-core/Tooltip';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import type { TooltipAdapterProps } from './TooltipAdapter.types';

export const TooltipAdapter = observer(
  ({ componentChildren, title, text, trigger, ...otherProps }: TooltipAdapterProps) => {
    const determineTrigger = () => {
      if (!componentChildren) return 'longHoverOrLongTouch';

      for (const child of componentChildren) {
        if ('props' in child && typeof child.props === 'object' && child.props && 'href' in child.props) {
          return 'longHover';
        }
        if (child.sfComponent === 'FontAwesomeIcon') {
          return 'hoverOrTouch';
        }
      }

      return 'longHoverOrLongTouch';
    };

    const _trigger = trigger || determineTrigger();
    const children = mapSmartFaceComponentsToAdapters(componentChildren);
    const _text = text || (title ? undefined : MISSING_STRING);

    return <Tooltip title={title} text={_text} children={children} trigger={_trigger} {...otherProps} />;
  },
);
