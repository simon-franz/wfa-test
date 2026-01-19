import { ERROR_CODES, WARNING_CODES } from '@hrworks/error-handling';
import getId from '@hrworks/sui-shared/functions/getId';
import { AxiosError, type AxiosProgressEvent } from 'axios';

import type { FileManagerValue } from '../../../adapters/core/FileManagerAdapter/FileManagerAdapter.types';
import { getRequestData, type SmartFaceContainer } from '../../../main/components/SmartFaceContainer';
import type { BackendPatchType } from '../../../types/shared/BackendResponseType/BackendPatchType';
import type { BackendResponseType } from '../../../types/shared/BackendResponseType/BackendResponseType';
import type {
  ChartEventPropsType,
  ChartEventType,
  CopyToClipboardEventType,
  EventUnion,
  FileManagerPostEvent,
  RedirectEventType,
  RequestDataType,
  RequestEventType,
  SfEventType,
  TreeGraphEventPropsType,
  TreeGraphEventType,
  UserlaneEventPropsType,
  UserlaneEventType,
} from '../../../types/shared/SfEventTypes';
import { loggingFunction as log } from '../ErrorHandling/functions/loggingFunction';
import { getSmartFaceBackendConfigProperty } from '../getSmartFaceBackendConfigProperty';
import { sfAxios, type SfAxiosResponse } from '../sfAxios';
import type { FileExportEvent } from '@hrworks/types/shared/SfEventTypes/FileExportEvent.types';

export type SfResponseType = object | null;

type FileUploadResponseType = BackendResponseType & {
  results?: Record<string, FileManagerValue>;
};

export type FileManagerUploadProgressEvent = CustomEvent<
  AxiosProgressEvent & Required<Pick<FileManagerPostEvent, 'targetSfIds'>>
>;

type FileDownloadResponseType = BackendResponseType & {
  filename: string;
  fileExtension: string;
  fileMimeType: string;
  fileContent?: string;
  fileContentUrl?: string;
};

export type FileManagerUploadedEvent = CustomEvent<{ targetSfIds: string[] }>;

export type ChartActionEventType = CustomEvent<ChartEventPropsType>;

export type TreeGraphActionEventType = CustomEvent<TreeGraphEventPropsType>;

export type UserlaneActionEventType = CustomEvent<UserlaneEventPropsType>;

type RequestType<T> = (eventData: Record<string, unknown>) => Promise<SfAxiosResponse<T>>;

export class EventController {
  constructor(private smartFaceContainer: SmartFaceContainer) {}

  pendingRequests: Set<string> = new Set();

  getBackendRequestData = (requestData: RequestDataType) => {
    const backendRequestData: Record<string, unknown> = getRequestData(requestData);
    const { sendBackendPatches = true } = requestData;

    let backendPatches: BackendPatchType[] = [];
    if (sendBackendPatches) {
      backendPatches = [...this.smartFaceContainer.asyncBackendPatches.values()];
      backendRequestData.backendPatches = backendPatches;
    }

    return backendRequestData;
  };

  cleanUpBackendPatches = (requestData: RequestDataType, backendRequestData: Record<string, unknown>) => {
    const { sendBackendPatches = true } = requestData;
    const { backendPatches } = backendRequestData;

    if (sendBackendPatches) {
      for (const [key, value] of this.smartFaceContainer.asyncBackendPatches.entries()) {
        if ((backendPatches as BackendPatchType[]).some((patch: any) => patch.patchId === value.patchId)) {
          this.smartFaceContainer.asyncBackendPatches.delete(key);
        }
      }
    }
  };

  prepareRequest = (requestData: RequestDataType, requestId: string) => {
    const { blockUi = true } = requestData;
    if (blockUi) {
      this.pendingRequests.add(requestId);
      this.smartFaceContainer.updateStateTree({ blockUI: true });
    }
  };

  finalizeRequest = (requestId: string) => {
    this.pendingRequests.delete(requestId);
    if (this.pendingRequests.size === 0) {
      this.smartFaceContainer.updateStateTree({ blockUI: false });
    }
  };

  sendRequest = async <T extends BackendResponseType = BackendResponseType>(
    requestData: RequestDataType,
    request: RequestType<T>,
  ): Promise<SfAxiosResponse<T> | null> => {
    let response: SfAxiosResponse<T> | null = null;
    const requestId = getId();
    try {
      this.prepareRequest(requestData, requestId);
      const backendRequestData = this.getBackendRequestData(requestData);
      response = await request(backendRequestData);
      if (response.type === 'success') {
        this.smartFaceContainer.sideEffectsController.applySideEffects(response.data.sideEffects ?? []);
        this.cleanUpBackendPatches(requestData, backendRequestData);
      }
      if (response.type === 'error') {
        this.smartFaceContainer.updateStateTree({
          axiosErrorCode:
            response.error instanceof AxiosError &&
            (response.error.code === 'ECONNABORTED' ||
              response.error.code === 'ETIMEDOUT' ||
              response.error.code === 'ERR_NETWORK' ||
              response.error.code === 'ERR_INTERNET_DISCONNECTED')
              ? response.error.code
              : null,
        });
      }
    } catch (error) {
      log({
        type: 'error',
        code: ERROR_CODES.UNKNOWN_ERROR,
        error: error instanceof Error ? error : new Error('' + error),
      });
    } finally {
      this.finalizeRequest(requestId);
    }

    return response;
  };

  requestEvent = async (event: RequestEventType) => {
    return this.sendRequest(
      event,
      async (eventData) =>
        await sfAxios.post<BackendResponseType>(
          event.url || getSmartFaceBackendConfigProperty('sfEventHandlerUrl') || import.meta.env.VITE_UPDATE_URL,
          { data: eventData },
        ),
    );
  };

  redirectEvent = async (event: RedirectEventType) => {
    const { url } = event;
    if (typeof url === 'string') {
      document.location = url;
    }

    return null;
  };

  onUploadProgress = (event: AxiosProgressEvent, targetSfIds: Required<FileManagerPostEvent['targetSfIds']>) => {
    window.dispatchEvent(
      new CustomEvent('file-manager-upload', {
        detail: {
          ...event,
          targetSfIds,
        },
      }) as FileManagerUploadProgressEvent,
    );
  };

  fileManagerPost = async (event: FileManagerPostEvent) => {
    if (!event.targetSfIds) {
      log({
        type: 'warning',
        code: WARNING_CODES.FILE_MANAGER_MISSING_TARGET_SFIDS,
        message: 'Property targetSfIds on FileManagerPostEvent not found',
      });

      return null;
    }
    const targetSfIdsWithFilesToUpload: string[] = [];
    const formData = new FormData();
    for (const form of document.querySelectorAll('form')) {
      const formId = form.dataset.smartFaceId;
      if (formId) {
        const fileManager = form.querySelectorAll<HTMLInputElement>('input[data-file-manager-id]');
        for (const singleFileManager of fileManager) {
          const { files, dataset } = singleFileManager;
          const { fileManagerId } = dataset;
          if (files && files.length && fileManagerId && event.targetSfIds.includes(fileManagerId)) {
            for (let i = 0; i < files.length; ++i) {
              targetSfIdsWithFilesToUpload.push(fileManagerId);
              const file = files.item(i);
              file && formData.append(`files__${formId}__${fileManagerId}`, file);
            }
          }
        }
      }
    }
    await this.sendRequest(event, async (backendRequestData) => {
      for (const [key, value] of Object.entries(backendRequestData)) {
        value !== undefined && formData.append(key, JSON.stringify(value));
      }
      const response = await sfAxios.post<FileUploadResponseType>(
        event.url ||
          getSmartFaceBackendConfigProperty('sfFileUploadHandlerUrl') ||
          import.meta.env.VITE_FILE_UPLOAD_URL!,
        {
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
          config: {
            onUploadProgress: (progressEvent) => this.onUploadProgress(progressEvent, targetSfIdsWithFilesToUpload),
          },
        },
      );

      if (response.type === 'success') {
        const { results = {} } = response.data;
        window.dispatchEvent(
          new CustomEvent('file-manager-uploaded', {
            detail: { targetSfIds: targetSfIdsWithFilesToUpload },
          }) as FileManagerUploadedEvent,
        );
        this.smartFaceContainer.applyUpdates(
          Object.entries(results).map(([sfId, value]) => ({
            operation: 'write',
            targetSfId: sfId,
            path: 'props.value',
            value,
          })),
        );
      }

      return response;
    });

    return null;
  };

  chartEvent = async (event: ChartEventType) => {
    if (!event.targetSfId) {
      log({
        type: 'warning',
        code: WARNING_CODES.CHART_MISSING_TARGET_SFID,
        message: 'Property targetSfId on Chart not found',
      });

      return null;
    }
    window.dispatchEvent(
      new CustomEvent('chart-action', {
        detail: {
          targetSfId: event.targetSfId,
          action: event.action,
          filename: event.filename,
          includeTitle: event.includeTitle,
          includeSubtitle: event.includeSubtitle,
        },
      }) as ChartActionEventType,
    );

    return null;
  };

  treeGraphEvent = async (event: TreeGraphEventType) => {
    window.dispatchEvent(
      new CustomEvent('tree-graph-action', {
        detail: { action: event.action, filename: event.filename, targetSfIds: event.targetSfIds },
      }) as TreeGraphActionEventType,
    );

    return null;
  };

  userlaneEvent = async (event: UserlaneEventType) => {
    window.dispatchEvent(
      new CustomEvent('userlane-action', {
        detail: {
          action: event.action,
          tour: { id: event.tour?.id, step: event.tour?.step },
        },
      }) as UserlaneActionEventType,
    );

    return null;
  };

  fileExport = async (event: FileExportEvent) => {
    const url = event.url || getSmartFaceBackendConfigProperty('sfFileExportHandlerUrl');
    if (!url) return null;

    const { mode = 'download' } = event;

    const response = await this.sendRequest(event, async (backendRequestData) => {
      const response = await sfAxios.post<FileDownloadResponseType>(url, {
        data: backendRequestData,
      });
      if (response.type !== 'success') return response;

      const { filename, fileExtension, fileMimeType, fileContent = '', fileContentUrl } = response.data;
      if (!filename || !fileExtension || (!fileContentUrl && !fileMimeType)) return response;

      const fetchInput = fileContentUrl || `data:${fileMimeType};base64,${fileContent}`;
      try {
        const fileResponse = await fetch(fetchInput);
        if (!fileResponse.ok) throw new Error(`An error occurred while fetching the file (${fileResponse.status})`);

        const blob = await fileResponse.blob();
        if (blob.size === 0) throw new Error('The provided fileContent is empty');

        const href = URL.createObjectURL(blob);

        if (mode === 'download') {
          const link = document.createElement('a');
          link.href = href;
          link.setAttribute('download', `${filename}.${fileExtension}`);
          document.body.append(link);
          link.click();
          link.remove();
          URL.revokeObjectURL(href);
        } else if (mode === 'print') {
          const printableFormats = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'svg'];

          if (printableFormats.includes(fileExtension.toLowerCase())) {
            const printFrame = document.createElement('iframe');
            printFrame.src = href;
            printFrame.style.display = 'none';
            document.body.append(printFrame);

            printFrame.onload = () => {
              const contentWindow = printFrame.contentWindow;
              if (!contentWindow) return;

              const cleanup = () => {
                URL.revokeObjectURL(href);
                printFrame.remove();
                window.removeEventListener('focus', cleanup);
              };

              window.addEventListener('focus', cleanup);

              contentWindow.focus();
              contentWindow.print();
            };
          }
        }
      } catch (error) {
        log({
          type: 'error',
          code: ERROR_CODES.FILE_DOWNLOAD_FETCH_ERROR,
          error: error as Error,
        });
      }

      return response;
    });

    return response;
  };

  copyToClipboardEvent = async (event: CopyToClipboardEventType) => {
    if (event.text) {
      navigator.clipboard.writeText(event.text);
    }

    return null;
  };

  mapEvent = async (event: EventUnion): Promise<SfResponseType> => {
    const eventWithDefaults: EventUnion = {
      // @ts-expect-error Default value
      type: 'request',
      ...event,
    };
    switch (eventWithDefaults.type) {
      case 'request':
        return await this.requestEvent(eventWithDefaults);
      case 'redirect':
        return await this.redirectEvent(eventWithDefaults);
      case 'file-manager-post':
        return await this.fileManagerPost(eventWithDefaults);
      case 'chart-action':
        return await this.chartEvent(eventWithDefaults);
      case 'tree-graph-action':
        return await this.treeGraphEvent(eventWithDefaults);
      case 'userlane-action':
        return await this.userlaneEvent(eventWithDefaults);
      case 'file-export':
        return await this.fileExport(eventWithDefaults);
      case 'copy-to-clipboard':
        return await this.copyToClipboardEvent(eventWithDefaults);
      default:
        log({
          type: 'error',
          code: ERROR_CODES.UNKNOWN_EVENT_TYPE,
          // @ts-expect-error Is of type never but it may run into this statement because of backend
          error: new Error(`Received unknown event type ${eventWithDefaults.type}`),
        });

        return null;
    }
  };

  applySingleEvent = async (event: EventUnion): Promise<SfResponseType> => {
    const response = await this.mapEvent(event);
    let childResponse: null | SfResponseType = null;
    if (event.childEvents) {
      childResponse = await this.applyEvents(event.childEvents);
    }

    return response || childResponse || null;
  };

  applyEvents = async (events: SfEventType): Promise<SfResponseType> => {
    const responses = await Promise.all(events.map((event) => this.applySingleEvent(event)));

    return responses.find((r) => r != null) || null;
  };
}
