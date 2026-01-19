import { action, makeObservable, observable, reaction } from 'mobx';

const html5History = window.history;

export type RouteChangeListenerType = (state: HistoryState) => void;

export type HistoryState = {
  currentRoute: string;
  previousRoute: string | null;
  backOrForward?: boolean;
  [key: string]: unknown;
};

export class History {
  constructor() {
    makeObservable(this);
    this.callRouteChangeListeners = reaction(() => this.state, this.callRouteChangeListeners);
    html5History.replaceState({ load: true }, '');
    window.addEventListener('popstate', this.onPopState);
  }

  private get currentRoute() {
    return window.location.pathname + window.location.search;
  }

  @observable
  state: HistoryState = {
    currentRoute: this.currentRoute,
    previousRoute: null,
  };

  private routeChangeListeners: Array<RouteChangeListenerType> = [];

  teardown = () => {
    window.removeEventListener('popstate', this.onPopState);
  };

  @action
  private setState = (route: this['state']['currentRoute'], state: Partial<this['state']>) => {
    this.state = {
      ...state,
      previousRoute: this.state.currentRoute,
      currentRoute: route,
    };
  };

  private onPopState = (event: PopStateEvent) => {
    queueMicrotask(() => {
      this.setState(this.currentRoute, { ...event.state, backOrForward: true });
    });
  };

  pushState = (url: string, title = '', state: Partial<HistoryState> = {}) => {
    html5History.pushState({ url, ...state }, title, url);
    document.title = title;
    this.setState(url, state);
  };

  replaceState = (url: string, title = '', state: Partial<HistoryState> = {}) => {
    html5History.replaceState({ url, ...state }, title, url);
    document.title = title;
    this.setState(url, state);
  };

  addRouteChangeListener = (listener: RouteChangeListenerType) => {
    this.routeChangeListeners.push(listener);
  };

  removeRouteChangeListener = (listener: RouteChangeListenerType) => {
    this.routeChangeListeners.splice(this.routeChangeListeners.indexOf(listener), 1);
  };

  callRouteChangeListeners = () => {
    for (const listener of this.routeChangeListeners) {
      listener(this.state);
    }
  };
}
