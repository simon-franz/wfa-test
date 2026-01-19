import { LocalizationContext } from '@hrworks/localization';
import { Icon } from '@hrworks/sui-core/Icon/Icon';
import { Panel } from '@xyflow/react';
import { useContext } from 'react';

import { FIT_VIEW_PADDING, ZOOM_DURATION } from '../constants';
import { ButtonWithTooltip } from './ButtonWithTooltip';
import { S } from './TreeGraphControls.styles';
import type { TreeGraphControlsProps } from './TreeGraphControls.types';

export const TreeGraphControls = ({
  showControls,
  reactFlowInstance,
  controlsChildren,
  ...otherProps
}: TreeGraphControlsProps) => {
  const { translate } = useContext(LocalizationContext);

  return (
    <Panel position="bottom-right">
      <S.Container {...otherProps}>
        {(showControls === true || showControls == null) && (
          <S.ControlPanel>
            <ButtonWithTooltip
              tooltipText={translate('tree-graph-zoom-out')}
              onClick={() => reactFlowInstance.zoomOut({ duration: ZOOM_DURATION })}
            >
              <Icon name="tree-graph-minus" />
            </ButtonWithTooltip>
            <ButtonWithTooltip
              tooltipText={translate('tree-graph-center')}
              onClick={() => reactFlowInstance.fitView({ duration: ZOOM_DURATION, padding: FIT_VIEW_PADDING })}
            >
              <Icon name="tree-graph-fit-view" />
            </ButtonWithTooltip>
            <ButtonWithTooltip
              tooltipText={translate('tree-graph-zoom-in')}
              onClick={() => reactFlowInstance.zoomIn({ duration: ZOOM_DURATION })}
            >
              <Icon name="tree-graph-plus" />
            </ButtonWithTooltip>
          </S.ControlPanel>
        )}
        {controlsChildren && <div>{controlsChildren}</div>}
      </S.Container>
    </Panel>
  );
};
