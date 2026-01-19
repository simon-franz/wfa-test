import { ERROR_CODES, ErrorHandlingProvider, Fallback, type LogData } from '@hrworks/error-handling';
import { Component } from 'react';

import { log } from '../functions/log';
import type { SmartFaceErrorBoundaryProps, SmartFaceErrorBoundaryState } from './SmartFaceErrorBoundary.types';

const excludedErrors = new Set([
  'ResizeObserver loop limit exceeded',
  'ResizeObserver loop completed with undelivered notifications.',
]);

export class SmartFaceErrorBoundary extends Component<SmartFaceErrorBoundaryProps, SmartFaceErrorBoundaryState> {
  state = { error: null };

  handleError = (error: Error) => {
    console.log(error);
    const errorCode = (error.message as LogData['code']) || ERROR_CODES.UNKNOWN_ERROR;
    log({ type: 'error', code: errorCode, error });
  };

  onError = ({ message, error, target, filename, lineno, colno }: ErrorEvent) => {
    if (error instanceof Error) {
      this.handleError(error);

      return;
    }

    if (excludedErrors.has(message)) {
      return;
    }

    const _target: string =
      target instanceof HTMLElement
        ? `ELEMENT:${target.tagName}#${target.id}`
        : target instanceof XMLHttpRequest
        ? `REQUEST:${target.responseType}>>${target.responseURL}`
        : target === window
        ? `WINDOW>${document.activeElement?.tagName}#${document.activeElement?.id}`
        : 'UNKNOWN';
    this.handleError(
      new Error(`Error without stack trace. Target: ${_target} Message: ${message} in ${filename}:${lineno}:${colno}`),
    );
  };

  onUnhandledRejection = (event: PromiseRejectionEvent) => {
    this.handleError(event.reason || new Error('Unhandled error in promise. No reason available.'));
  };

  componentDidCatch(error: Error) {
    this.handleError(error);
    this.setState({ error });
  }

  componentDidMount() {
    window.addEventListener('error', this.onError);
    window.addEventListener('unhandledrejection', this.onUnhandledRejection);
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.onError);
    window.removeEventListener('unhandledrejection', this.onUnhandledRejection);
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (error) {
      return <Fallback />;
    }

    return <ErrorHandlingProvider log={log}>{children}</ErrorHandlingProvider>;
  }
}
