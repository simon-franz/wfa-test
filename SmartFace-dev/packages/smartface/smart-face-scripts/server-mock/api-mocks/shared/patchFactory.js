//@ts-check

/**
 * @template { import('../../../../src/types/shared/BackendResponseType/SideEffectTypes/PatchType').PatchType } PatchType
 * @template { import('../../../../src/types/shared/BackendResponseType/SideEffectTypes/SideEffectTypes').SideEffectType } SideEffectType
 * @template { import('../../../../src/types/shared/BackendResponseType/BackendResponseType').BackendResponseType } BackendResponseType
 * @param { Partial<PatchType>['updates'] } updates
 * @param { Array<SideEffectType> } [sideEffects]
 * @returns { BackendResponseType }
 */
export function patchFactory(updates, sideEffects = []) {
  const patch = /** @type { BackendResponseType } */ ({
    sideEffects: [...(sideEffects || []), { type: 'patch', updates: updates || [] }],
  });

  return patch;
}
