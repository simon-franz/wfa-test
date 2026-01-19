import LoadingAnimation from '@hrworks/sui-core/LoadingAnimation';
import { observer } from 'mobx-react';
import { lazy, Suspense, useContext } from 'react';

import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import { WorkflowGraphEdgesAdapter } from './Edge/WorkflowGraphEdgesAdapter';
import { WorkflowGraphNodesAdapter } from './Node/WorkflowGraphNodesAdapter';
import type { WorkflowGraphAdapterProps } from './WorkflowGraphAdapter.types';

const WorkflowGraph = lazy(() => import('@hrworks/sui-extension/WorkflowGraph'));

export const WorkflowGraphAdapter = observer(({ nodes = [], edges = [], ...otherProps }: WorkflowGraphAdapterProps) => {
  const { defaultFullHeight } = useContext(DefaultValueContext);
  const _nodes = WorkflowGraphNodesAdapter(nodes);
  const _edges = WorkflowGraphEdgesAdapter(edges);

  return (
    <Suspense fallback={<LoadingAnimation type="spinner" />}>
      <WorkflowGraph nodes={_nodes} edges={_edges} fullHeight={defaultFullHeight} {...otherProps} />
    </Suspense>
  );
});
