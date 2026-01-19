import { WARNING_CODES } from '@hrworks/error-handling';
import getId from '@hrworks/sui-shared/functions/getId';
import { queueMacrotask } from '@hrworks/sui-shared/functions/queueMacrotask';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import { action, makeObservable } from 'mobx';
import { focusable } from 'tabbable';

import type { InternalServerErrorBackendDefinition } from '../../../adapters/core/InternalServerErrorAdapter/InternalServerErrorAdapter.types';
import type { SmartFaceContainer } from '../../../main/components/SmartFaceContainer/SmartFaceContainer';
import type {
  ConsoleMessageType,
  InternalServerError,
  NavigateToElementType,
  SessionExpiredType,
  SideEffectType,
} from '../../../types/shared/BackendResponseType/SideEffectTypes';
import type { UpdateSmartFaceBackendConfigType } from '../../../types/shared/BackendResponseType/SideEffectTypes/UpdateSmartFaceBackendConfigType';
import { loggingFunction as log } from '../ErrorHandling/functions/loggingFunction';
import { Debugger } from './Debugger';

const functionTemplate = (javascript: string) => new Function(`"use strict"; return ${javascript}`)();

export class SideEffectsController {
  componentDebugger: Debugger;
  private sessionExpiredTriggered = false;

  constructor(private smartFaceContainer: SmartFaceContainer) {
    this.componentDebugger = new Debugger(this.smartFaceContainer);
    makeObservable(this);
  }

  @action
  applySideEffects = (sideEffects: Array<SideEffectType>) => {
    for (const sideEffect of sideEffects) {
      switch (sideEffect.type) {
        case 'patch':
          this.smartFaceContainer.applyUpdates(sideEffect.updates);
          break;
        case 'navigateToElement':
          queueMacrotask(() => this.navigateToElement(sideEffect));
          break;
        case 'redirect':
          setTimeout(() => (document.location = sideEffect.url), sideEffect.delay || 0);
          break;
        case 'showInternalError':
          this.handleInternalServerError(sideEffect);
          break;
        case 'addNotification':
          this.smartFaceContainer.notificationsController.add(sideEffect);
          break;
        case 'removeNotification':
          this.smartFaceContainer.notificationsController.remove(sideEffect.id);
          break;
        case 'blockUI':
          queueMicrotask(() => this.smartFaceContainer.updateStateTree({ blockUI: true }));
          break;
        case 'updateSmartFaceBackendConfig':
          this.updateSmartFaceBackendConfig(sideEffect);
          break;
        case 'clearSideEffects':
          this.reset();
          break;
        case 'enableComponentDebugger':
          this.componentDebugger.enableComponentDebugger(sideEffect);
          break;
        case 'disableComponentDebugger':
          this.componentDebugger.disableComponentDebugger();
          break;
        case 'javaScriptExecutor':
          functionTemplate(sideEffect.javaScript!)(this.smartFaceContainer);
          break;
        case 'pushHistoryState':
          this.smartFaceContainer.history.pushState(sideEffect.url, sideEffect.title);
          break;
        case 'replaceHistoryState':
          this.smartFaceContainer.history.replaceState(sideEffect.url, sideEffect.title);
          break;
        case 'consoleMessage':
          this.consoleLog(sideEffect);
          break;
        case 'sessionExpired':
          this.handleSessionExpired(sideEffect);
          break;
        default:
          log({
            type: 'warning',
            code: WARNING_CODES.UNKNOWN_SIDEEFFECT,
            message: `Unknown side effect: ${(sideEffect as any).type}`,
          });
          break;
      }
    }
  };

  handleInternalServerError = (error: InternalServerError) => {
    const rootElements = this.smartFaceContainer.stateTree.smartFaceTree.root;
    if (rootElements.length > 0 && rootElements[0].props && 'componentChildren' in rootElements[0].props) {
      this.smartFaceContainer.stateTree.smartFaceTree.applyUpdates([
        {
          operation: 'append',
          targetSfId: rootElements[0].sfId,
          path: 'props.componentChildren',
          value: {
            sfComponent: 'InternalServerError',
            sfId: getId(),
            props: {
              ...error,
            },
          } as InternalServerErrorBackendDefinition,
        },
      ]);
    } else {
      this.smartFaceContainer.stateTree.smartFaceTree.replaceTree([
        {
          sfComponent: 'InternalServerError',
          sfId: getId(),
          props: {
            ...error,
          },
        },
      ]);
    }
  };

  reset = () => {
    this.smartFaceContainer.notificationsController.empty();
    this.componentDebugger.disableComponentDebugger();
    this.sessionExpiredTriggered = false;
  };

  handleSessionExpired = (sideEffect: SessionExpiredType) => {
    if (this.sessionExpiredTriggered) {
      return;
    }

    this.sessionExpiredTriggered = true;

    queueMicrotask(() =>
      this.smartFaceContainer.updateStateTree({
        sessionExpired: {
          targetUrl: sideEffect.targetUrl,
          autoRedirectAfterMilliseconds: sideEffect.autoRedirectAfterMilliseconds,
        },
      }),
    );

    if (sideEffect.autoRedirectAfterMilliseconds) {
      setTimeout(() => {
        window.location.href = sideEffect.targetUrl;
      }, sideEffect.autoRedirectAfterMilliseconds);
    }
  };

  navigateToElement = (sideEffect: NavigateToElementType) => {
    const { id, focus, scrollIntoView = true } = sideEffect;
    const element = document.querySelector(`[data-sfid=${id}]`) as HTMLElement | null;
    if (!element) {
      return;
    }
    if (focus) {
      focusable(element, { includeContainer: true })[0]?.focus();
    } else if (scrollIntoView) {
      element.scrollIntoView({ block: 'center' });
    }
  };

  updateSmartFaceBackendConfig = (sideEffect: UpdateSmartFaceBackendConfigType) => {
    const { fields, merge: mergeValue = true } = sideEffect;
    if (isObject(fields) && isObject(window.smartFaceBackendConfig)) {
      if (mergeValue) {
        merge(window.smartFaceBackendConfig, fields);
      } else {
        Object.assign(window.smartFaceBackendConfig, fields);
      }
    }
  };

  consoleLog = (sideEffect: ConsoleMessageType) => {
    if (sideEffect.level === 'error') {
      console.error(sideEffect.message);
    } else if (sideEffect.level === 'warn') {
      console.warn(sideEffect.message);
    } else {
      console.log(sideEffect.message);
    }
  };
}
