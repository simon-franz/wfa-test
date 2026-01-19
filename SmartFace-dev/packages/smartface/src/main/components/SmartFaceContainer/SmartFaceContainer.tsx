import { BlockUI } from '@hrworks/sui-core/BlockUI';
import { DropzoneManager } from '@hrworks/sui-core/Dropzone';
import { ErrorModal } from '@hrworks/sui-core/ErrorModal/ErrorModal';
import Userlane from '@hrworks/sui-extension/Userlane';
import { detectOS } from '@hrworks/sui-shared/functions/detectOS';
import getId from '@hrworks/sui-shared/functions/getId';
import { AxiosError } from 'axios';
import memoize from 'lodash/memoize';
import { action, computed, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';

import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import { SmartFaceContext, type SmartFaceContextType } from '../../../main/components/SmartFaceContext';
import { EventController } from '../../../main/lib/EventController';
import { History, type HistoryState, type RouteChangeListenerType } from '../../../main/lib/History';
import { NotificationsController } from '../../../main/lib/NotificationsController';
import { sfAxios } from '../../../main/lib/sfAxios';
import { SideEffectsController } from '../../../main/lib/SideEffectsController';
import { SmartFaceTree } from '../../../main/lib/SmartFaceTree';
import type { BackendPatchType } from '../../../types/shared/BackendResponseType/BackendPatchType';
import type { SmartFaceBackendDataType } from '../../../types/shared/BackendResponseType/SmartFaceBackendDataType';
import type { Update } from '../../../types/shared/BackendResponseType/UpdateTypes';
import type { EventUnion } from '../../../types/shared/SfEventTypes';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';
import { getSmartFaceBackendConfigProperty } from '../../lib/getSmartFaceBackendConfigProperty';
import { getTabId } from '../../lib/getTabId';
import UiHandler from '../UiHandler';

export type AxiosNetworkErrorCodeType =
  | null
  | 'ECONNABORTED'
  | 'ETIMEDOUT'
  | 'ERR_NETWORK'
  | 'ERR_INTERNET_DISCONNECTED';

export interface SmartFaceContainerProps {
  smartFaceComponents: SmartFaceComponentsType[];
  adapterBook?: boolean;
  sideEffects?: any;
}

export interface SmartFaceContainerState {
  blockUI: boolean;
  isLoaded: boolean;
  axiosErrorCode: AxiosNetworkErrorCodeType;
  smartFaceTree: SmartFaceTree;
  sessionExpired: {
    targetUrl: string;
    autoRedirectAfterMilliseconds?: number;
  } | null;
}

@observer
export class SmartFaceContainer extends Component<SmartFaceContainerProps> {
  @observable
  public stateTree: SmartFaceContainerState = {
    blockUI: false,
    isLoaded: false,
    axiosErrorCode: null,
    sessionExpired: null,
    smartFaceTree: new SmartFaceTree([]),
  };

  constructor(props: SmartFaceContainerProps) {
    super(props);
    makeObservable(this);
  }

  @action
  updateStateTree = (update: Partial<SmartFaceContainerState>) => {
    this.stateTree = { ...this.stateTree, ...update };
  };

  asyncBackendPatches: Map<string, BackendPatchType> = new Map();

  @observable
  history = new History();

  @observable
  notificationsController = new NotificationsController();

  sideEffectsController = new SideEffectsController(this);

  eventController = new EventController(this);

  @action
  applyUpdates = (updates: Update[]) => {
    this.stateTree.smartFaceTree.applyUpdates(updates);
  };

  queueBackendPatches = (sfId: string, backendPatches: Update[]) => {
    this.asyncBackendPatches.set(sfId, { patchId: getId(), updates: backendPatches });
  };

  @action
  loadViewData = async (url: string, historyState?: HistoryState) => {
    this.updateStateTree({ blockUI: true });
    const tabId = getTabId();
    const headers = {
      'Tab-Id': tabId,
    };

    const response = historyState?.backOrForward
      ? await sfAxios.post<SmartFaceBackendDataType>(
          getSmartFaceBackendConfigProperty('sfHistoryHandlerUrl') || import.meta.env.VITE_HANDLE_HISTORY_URL!,
          {
            data: {
              targetUrl: url,
              sourceUrl: this.history.state.previousRoute,
            },
            headers,
          },
        )
      : await sfAxios.post<SmartFaceBackendDataType>(url, { headers });
    if (response.type === 'success') {
      if (historyState?.backOrForward) {
        this.sideEffectsController.reset();
      }
      const { sfComponents, sideEffects } = response.data;
      this.stateTree.smartFaceTree.replaceTree(sfComponents || []);
      this.sideEffectsController.applySideEffects(sideEffects ?? []);
      this.updateStateTree({
        isLoaded: true,
      });
    }
    if (response.type === 'error') {
      this.updateStateTree({
        axiosErrorCode:
          response.error instanceof AxiosError &&
          (response.error.code === 'ECONNABORTED' || response.error.code === 'ETIMEDOUT')
            ? response.error.code
            : null,
      });
    }
    this.updateStateTree({ blockUI: false });
  };

  componentDidMount(): void {
    if (this.props.adapterBook) {
      this.stateTree.smartFaceTree.replaceTree(this.props.smartFaceComponents || []);
      this.sideEffectsController.applySideEffects(this.props.sideEffects ?? []);
      this.updateStateTree({
        isLoaded: true,
      });

      return;
    }
    this.memoizedLoadViewData(
      getSmartFaceBackendConfigProperty('sfBaseUrl') ? window.location.href : this.history.state.currentRoute,
    );
    this.history.addRouteChangeListener(this.onRouteChange);
    // On iOS if an inputfield has a fontSize < 16 then it zooms to the InputField. We dont want this:
    // https://weblog.west-wind.com/posts/2023/Apr/17/Preventing-iOS-Safari-Textbox-Zooming
    if (detectOS() === 'iOS') {
      document
        ?.querySelector('[name=viewport]')
        ?.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
    }
  }

  // only for Adapterbook
  componentDidUpdate(prevProps: Readonly<SmartFaceContainerProps>): void {
    if (this.props.adapterBook && prevProps !== this.props) {
      this.stateTree.smartFaceTree.replaceTree(this.props.smartFaceComponents || []);
      this.updateStateTree({
        isLoaded: true,
      });
    }
  }

  onRouteChange: RouteChangeListenerType = (state) => {
    if (state.backOrForward) {
      this.loadViewData(state.currentRoute, state);
    }
  };

  dispatchPubSubEvent = (eventToDispatch: EventUnion & Record<string, any>) => {
    const customEvent = new CustomEvent(eventToDispatch.type, { detail: eventToDispatch });
    window.dispatchEvent(customEvent);
  };

  memoizedLoadViewData = memoize(this.loadViewData);

  componentWillUnmount() {
    this.history.removeRouteChangeListener(this.onRouteChange);
    this.history.teardown();
  }

  setBlockUI: SmartFaceContextType['setBlockUI'] = (blockUI) => this.updateStateTree({ blockUI });
  setAxiosErrorCode: SmartFaceContextType['setAxiosErrorCode'] = (axiosErrorCode) =>
    this.updateStateTree({ axiosErrorCode: axiosErrorCode });

  @computed
  get contextValue(): SmartFaceContextType {
    return {
      applyEvents: this.eventController.applyEvents,
      applySideEffects: this.sideEffectsController.applySideEffects,
      applyUpdates: this.applyUpdates,
      queueBackendPatches: this.queueBackendPatches,
      sendRequest: this.eventController.sendRequest,
      history: this.history,
      notificationsController: this.notificationsController,
      setBlockUI: this.setBlockUI,
      setAxiosErrorCode: this.setAxiosErrorCode,
    };
  }

  sfGuidanceHandler = getSmartFaceBackendConfigProperty('sfGuidanceHandler')?.name === 'userlane' ? <Userlane /> : null;

  render() {
    this.stateTree.isLoaded && document.querySelector('#loaderLayout')?.remove();

    return (
      <SmartFaceContext.Provider value={this.contextValue}>
        <UiHandler>
          {this.stateTree.isLoaded && (
            <>
              <BlockUI isOpen={this.stateTree.blockUI} />
              {this.sfGuidanceHandler}
              <DropzoneManager>{mapSmartFaceComponentsToAdapters(this.stateTree.smartFaceTree.root)}</DropzoneManager>
            </>
          )}
          <ErrorModal
            show={!!this.stateTree.axiosErrorCode}
            title={
              this.stateTree.axiosErrorCode === 'ECONNABORTED' || this.stateTree.axiosErrorCode === 'ETIMEDOUT'
                ? 'client-timeout-error-title'
                : 'offline-error-title'
            }
            text={
              this.stateTree.axiosErrorCode === 'ECONNABORTED' || this.stateTree.axiosErrorCode === 'ETIMEDOUT'
                ? 'client-timeout-error-text'
                : 'offline-error-text'
            }
            translateTextAndTitle
            onDismiss={() => {
              this.updateStateTree({
                axiosErrorCode: null,
              });
            }}
          />
          <ErrorModal
            show={!!this.stateTree.sessionExpired}
            text="session-expired-text"
            translateTextAndTitle
            onDismiss={() => (window.location.href = this.stateTree.sessionExpired!.targetUrl)}
          />
        </UiHandler>
      </SmartFaceContext.Provider>
    );
  }
}
