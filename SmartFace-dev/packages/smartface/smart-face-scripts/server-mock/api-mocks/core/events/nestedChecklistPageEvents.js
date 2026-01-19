// @ts-check
import getId from '../../../../../shared/getId.js';
import { nestedChecklistEntryFactory } from '../../../../../shared/smartFaceComponentFactories/extension/nestedChecklistFactory.js';
import { patchFactory } from '../../shared/patchFactory.js';

const nestedCheckedMap = {};

export default (body) => {
  const { pageEvent: event } = body.backendEventData;
  const { targetSfId } = body.frontendEventData;

  body.backendPatches?.forEach(({ updates }) =>
    updates.forEach(({ operation, targetSfId: patchSfId, path, value }) => {
      if (operation === 'write' && path === 'props.checkDescendantsOnFetchEntries') {
        nestedCheckedMap[patchSfId] = value;
      }
    }),
  );

  const nestedChecked = nestedCheckedMap[targetSfId];

  switch (event) {
    case 'fetchEntries':
      return patchFactory([
        {
          targetSfId,
          operation: 'append',
          path: 'props.entries',
          value: Array.from({ length: 3 }).map((_, i) => {
            const id = getId();
            nestedChecked && (nestedCheckedMap[id] = nestedChecked);

            return nestedChecklistEntryFactory(
              {
                label: `UE-${i}`,
                checked: nestedChecked,
                checkDescendantsOnFetchEntries: nestedChecked,
                expanded: false,
                onFetchEntries: [
                  {
                    type: 'request',
                    blockUi: false,
                    data: { action: 'nested-checklist', pageEvent: 'fetchEntries' },
                  },
                ],
              },
              id,
            );
          }),
        },
        {
          targetSfId,
          operation: 'delete',
          path: 'props.onFetchEntries',
        },
      ]);

    case 'slowFetchEntries':
      return patchFactory([
        {
          targetSfId,
          operation: 'append',
          path: 'props.entries',
          value: Array.from({ length: 3 }).map((_, i) => {
            const id = getId();
            nestedChecked && (nestedCheckedMap[id] = nestedChecked);

            return nestedChecklistEntryFactory(
              {
                label: `UE-${i}`,
                checked: nestedChecked,
                checkDescendantsOnFetchEntries: nestedChecked,
                expanded: false,
              },
              id,
            );
          }),
        },
        {
          targetSfId,
          operation: 'delete',
          path: 'props.onFetchEntries',
        },
      ]);

    default:
      return {};
  }
};
