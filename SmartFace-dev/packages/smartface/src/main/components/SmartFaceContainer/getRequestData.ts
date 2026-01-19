import { getFormData } from '../../../main/lib/getFormData';
import type { RequestDataType } from '../../../types/shared/SfEventTypes';

export function getRequestData(event: RequestDataType & { frontendEventData?: Record<string, unknown> }) {
  const { sendFormData = true, data, frontendEventData, sfId } = event;

  const sendToBackend: Record<string, any> = {};

  if (sendFormData) {
    const formDataObject: Record<string, any> = {};
    for (const form of document.querySelectorAll('form')) {
      const formId = form.dataset.smartFaceId;
      if (formId) {
        formDataObject[formId] = getFormData(form);
      }
    }
    sendToBackend.formData = formDataObject;
  }

  sendToBackend.sfId = sfId;
  sendToBackend.backendEventData = data;
  sendToBackend.frontendEventData = frontendEventData;

  return sendToBackend;
}
