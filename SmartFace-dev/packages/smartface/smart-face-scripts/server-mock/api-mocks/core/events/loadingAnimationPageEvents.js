import { loadingAnimationFactory } from '../../../../../shared/smartFaceComponentFactories/core/loadingAnimationFactory.js';
import { patchFactory } from '../../shared/patchFactory.js';

let loading = true;

export default (body) => {
  switch (body.backendEventData.pageEvent) {
    case 'buttonPressed':
      if (loading) {
        loading = false;

        return patchFactory([
          {
            operation: 'write',
            targetSfId: 'overlay1',
            path: 'props.loading',
            value: false,
          },
          {
            operation: 'write',
            targetSfId: 'overlay2',
            path: 'props.loading',
            value: false,
          },
          {
            operation: 'write',
            targetSfId: 'loadingButton',
            path: 'props.text',
            value: 'Start Loading',
          },
          {
            operation: 'write',
            targetSfId: 'loadingButton',
            path: 'props.color',
            value: 'success',
          },
          {
            operation: 'delete',
            targetSfId: 'animation1',
          },
          {
            operation: 'delete',
            targetSfId: 'animation2',
          },
          {
            operation: 'delete',
            targetSfId: 'animation3',
          },
          {
            operation: 'write',
            targetSfId: 'overlay3',
            path: 'props.loading',
            value: false,
          },
        ]);
      } else {
        loading = true;

        return patchFactory([
          {
            operation: 'write',
            targetSfId: 'overlay1',
            path: 'props.loading',
            value: true,
          },
          {
            operation: 'write',
            targetSfId: 'overlay2',
            path: 'props.loading',
            value: true,
          },
          {
            operation: 'write',
            targetSfId: 'loadingButton',
            path: 'props.text',
            value: 'Stop Loading',
          },
          {
            operation: 'write',
            targetSfId: 'loadingButton',
            path: 'props.color',
            value: 'danger',
          },
          {
            targetSfId: 'card1',
            operation: 'append',
            path: 'props.bodyChildren',
            value: loadingAnimationFactory({}, 'animation1'),
          },
          {
            targetSfId: 'card2',
            operation: 'append',
            path: 'props.bodyChildren',
            value: loadingAnimationFactory({ count: 2 }, 'animation2'),
          },
          {
            targetSfId: 'card3',
            operation: 'append',
            path: 'props.bodyChildren',
            value: loadingAnimationFactory({ type: 'spinner' }, 'animation3'),
          },
          {
            operation: 'write',
            targetSfId: 'overlay3',
            path: 'props.loading',
            value: true,
          },
        ]);
      }

    default:
      return {};
  }
};
