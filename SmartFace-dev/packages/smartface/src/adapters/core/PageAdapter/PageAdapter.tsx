import Page from '@hrworks/sui-core/Page';
import type { Notification } from '@hrworks/sui-shared/classes/Notification';
import getId from '@hrworks/sui-shared/functions/getId';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef } from 'react';

import { ModalAdapter } from '../../../adapters/core/PageAdapter/Modal';
import type { ModalBackendDefinition } from '../../../adapters/core/PageAdapter/Modal/ModalAdapter.types';
import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import { mapSmartFaceComponentPartsToAdapter } from '../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import { isPlainObject } from '../../../main/lib/isPlainObject';
import type { SfEventType } from '../../../types/shared/SfEventTypes';
import { BlankLayoutAdapter } from '../BlankLayoutAdapter';
import type { HeadField, PageAdapterProps } from './PageAdapter.types';

export const PageAdapter = observer(
  ({ document: _document, modals = [], componentChildren, ...otherProps }: PageAdapterProps) => {
    const { applyEvents, notificationsController } = useContext(SmartFaceContext);
    const { notifications } = notificationsController;

    const headChildrenRef = useRef<Record<string, ChildNode>>({});
    const blankLayoutId = useRef(getId()).current;

    const isHeadField = (subject: unknown): subject is HeadField => {
      return (
        isPlainObject(subject) &&
        'tag' in subject &&
        typeof subject.tag === 'string' &&
        'attributes' in subject &&
        isPlainObject(subject.attributes) &&
        Object.entries(subject.attributes).every(([key, value]) => typeof key === 'string' && typeof value === 'string')
      );
    };

    useEffect(() => {
      const applySideEffects = () => {
        if (_document) {
          const { head } = _document;
          if (head) {
            if (head.title) {
              document.title = head.title;
            }
            if (head.fields) {
              const headElement = document.querySelector('head');
              for (const [fieldId, fieldValue] of Object.entries(head.fields)) {
                if (fieldValue && isHeadField(fieldValue) && !headChildrenRef.current[fieldId]) {
                  const { tag, attributes, innerText } = fieldValue;
                  const element = document.createElement(tag);
                  for (const [attributeName, attributeValue] of Object.entries(attributes)) {
                    element.setAttribute(attributeName, attributeValue);
                  }
                  innerText && element.append(document.createTextNode(innerText));
                  headElement!.append(element);
                  headChildrenRef.current[fieldId] = element;
                } else if (headChildrenRef.current[fieldId] && !fieldValue) {
                  const headChild = headChildrenRef.current[fieldId];
                  headChild?.remove();
                  delete headChildrenRef.current[fieldId];
                }
              }
            }
          }
        }
      };

      applySideEffects();
    }, [_document]);

    const onDismissNotification = (notificationId: Notification['id'], event?: SfEventType) => {
      notificationsController.remove(notificationId);
      event && applyEvents(event);
    };
    const children = componentChildren?.length ? (
      mapSmartFaceComponentsToAdapters(componentChildren)
    ) : (
      <BlankLayoutAdapter id={blankLayoutId} />
    );

    const flattenChildModals = (
      modal: ModalBackendDefinition,
      modalGroup: ModalBackendDefinition[] = [],
    ): ModalBackendDefinition[] => {
      const newModalGroup = modalGroup;
      const { sfId, dataGuideId, props = {} } = modal;
      const { childModal, ...modalCopy } = props;

      const newModal = {
        sfId,
        dataGuideId,
        props: { ...modalCopy },
      } as ModalBackendDefinition;

      newModalGroup.push(newModal);

      return childModal ? flattenChildModals(childModal, newModalGroup) : newModalGroup;
    };

    const modalGroups = modals.map((modalParent) =>
      mapSmartFaceComponentPartsToAdapter(ModalAdapter, flattenChildModals(modalParent)),
    );

    return (
      <Page
        modals={modalGroups}
        notifications={notifications}
        onDismissNotification={onDismissNotification}
        children={children}
        {...otherProps}
      />
    );
  },
);
