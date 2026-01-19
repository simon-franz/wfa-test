import Modal from '@hrworks/sui-core/Modal';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { mapSmartFaceComponentsToAdapters } from '../../../../main/components/ComponentMapper';
import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import type { Update } from '../../../../types/shared/BackendResponseType/UpdateTypes';
import type { ModalAdapterProps } from './ModalAdapter.types';

export const ModalAdapter = observer(
  ({
    id,
    bodyChildren,
    footerChildren,
    childModal,
    closeable,
    preventClose,
    onBeforeClose,
    onAfterClose,
    ...otherProps
  }: ModalAdapterProps) => {
    const { applyEvents, applyUpdates, queueBackendPatches } = useContext(SmartFaceContext);

    const onClose = async () => {
      if (closeable) {
        onBeforeClose && (await applyEvents(onBeforeClose));
        if (!preventClose) {
          const patches: Update[] = [{ targetSfId: id, operation: 'delete', path: null }];
          queueBackendPatches(id, patches);
          applyUpdates(patches);
          onAfterClose && applyEvents(onAfterClose);
        }
      }
    };

    const children = bodyChildren && mapSmartFaceComponentsToAdapters(bodyChildren);
    const footer = footerChildren && mapSmartFaceComponentsToAdapters(footerChildren);

    return (
      <Modal
        id={id}
        key={id}
        onClose={onClose}
        closeable={closeable}
        footer={footer}
        children={children}
        show
        deactivateAnimatePresence
        {...otherProps}
      />
    );
  },
);
