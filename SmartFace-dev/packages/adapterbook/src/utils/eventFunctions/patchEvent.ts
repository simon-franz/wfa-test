import type { Update } from '@hrworks/smartface/types/shared/BackendResponseType/UpdateTypes';

export const patchEvent = (props: Update) => {
  return {
    type: 'request',
    data: {
      action: 'reflect',
      reflectedData: {
        sideEffects: [
          {
            type: 'patch',
            updates: [
              {
                operation: props.operation,
                targetSfId: props.targetSfId,
                path: `props.${props.path}`,
                ...(props.operation !== 'delete' && { value: props.value }),
              },
            ],
          },
        ],
      },
    },
  } as const;
};
