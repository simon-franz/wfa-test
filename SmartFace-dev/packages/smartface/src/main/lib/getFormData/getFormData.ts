import { isValidTimeString } from '@hrworks/sui-shared/functions/validateTimeString';
import head from 'lodash/head';

type PossibleValuesType = string | null;
type SfFormDataType = Record<string, PossibleValuesType>;
type MultiSelectionType = Record<string, Array<string>>;

function convertNullValue(input: HTMLInputElement, value: PossibleValuesType): string | null {
  return input.dataset.getFormDataNullValue && value === '' ? null : value;
}

function inputToKeyValue(input: HTMLInputElement): [key: string, value: PossibleValuesType] {
  const { name, checked, dataset } = input;
  let value: PossibleValuesType = null;
  if (input.type === 'checkbox') {
    value = checked ? 'true' : 'false';
  } else if (input.type === 'time' || dataset.inputTypeTime !== undefined) {
    value = isValidTimeString(input.value) ? input.value : null;
  } else if (dataset.getFormDataUnmasked != null) {
    const mask = dataset.getFormDataMask?.toLocaleLowerCase();
    const unmaskedValue = dataset.getFormDataUnmasked.toLocaleLowerCase();
    value = unmaskedValue && unmaskedValue !== mask ? unmaskedValue : null;
    if (dataset.getFormDataParsed) {
      value = unmaskedValue && unmaskedValue !== mask ? JSON.parse(unmaskedValue) : null;
    }
  } else if (dataset.getFormDataArray) {
    value = input.value === '' ? '' : JSON.parse(input.value);
  } else {
    value = input.value;
  }

  return [name, value];
}

function regularInputsToFormData(inputs: Array<HTMLInputElement>): SfFormDataType {
  const formData: SfFormDataType = {};

  for (const input of inputs) {
    if (input.name) {
      const [key, value] = inputToKeyValue(input);
      formData[key] = convertNullValue(input, value);
    }
  }

  return formData;
}

function groupsToFormData(inputs: Array<HTMLInputElement>): MultiSelectionType {
  const formData: MultiSelectionType = {};

  for (const input of inputs) {
    const inputGroupId = input.dataset.inputGroupId!;
    formData[inputGroupId] = formData[inputGroupId] || [];
    if (input.checked) {
      formData[inputGroupId].push(input.name);
    }
  }

  return formData;
}

function radioInputsToFormData(radioInputs: Array<HTMLInputElement>): SfFormDataType {
  const formData: SfFormDataType = {};
  const radioInputsNames = new Set(radioInputs.map(({ name }) => name));

  for (const radioName of radioInputsNames) {
    const valueFromRadioInputs = radioInputs
      .filter(({ name }) => radioName === name)
      .filter(({ checked }) => checked)
      .map(({ value }) => value);

    formData[radioName] = valueFromRadioInputs.length > 0 ? head(valueFromRadioInputs)! : null;
  }

  return formData;
}

export function getFormData(formElement?: HTMLFormElement) {
  const formData: SfFormDataType = {};

  if (!formElement) {
    return formData;
  }

  // TODO Invert data-get-form-data-ignore and move property to adapter
  // To keep the UIs clean, getFormData should only get elements that have a specific data attribute,
  // currently all input elements are fetched except those with data-get-form-data-ignore,
  // requiring every not-to-serialize input to have that specific data attribute.
  // Since this logic is for a use with SmartFace, this logic should be inverted so the UI libraries may be clean
  const inputs = formElement.querySelectorAll<HTMLInputElement>(
    'input:not([data-get-form-data-ignore]), select:not([data-get-form-data-ignore]), textarea:not([data-get-form-data-ignore])',
  );
  const regularInputs: Array<HTMLInputElement> = [];
  const radios: Array<HTMLInputElement> = [];
  const groups: Array<HTMLInputElement> = [];

  for (const input of inputs) {
    if (input.dataset.inputGroupId) {
      groups.push(input);
    } else {
      switch (input.type) {
        case 'radio':
          radios.push(input);
          break;
        default:
          regularInputs.push(input);
      }
    }
  }

  Object.assign(
    formData,
    regularInputsToFormData(regularInputs),
    radioInputsToFormData(radios),
    groupsToFormData(groups),
  );

  // TODO input[range]
  // TODO input[tel]
  // TODO input[email]
  // TODO input[hidden]
  // TODO input[file]

  return formData;
}
