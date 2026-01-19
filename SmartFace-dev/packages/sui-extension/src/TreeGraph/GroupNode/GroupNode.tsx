import { Position } from '@xyflow/react';
import { useMemo } from 'react';

import { ChildNode } from './ChildNode';
import { S } from './GroupNode.styles';
import type { GroupedNodeProps } from './GroupNode.types';

export const GroupNode = ({ data }: GroupedNodeProps) => {
  const columns = useMemo(() => {
    if (data.groupedEntries.length >= 4) {
      return 4;
    }

    return data.groupedEntries.length;
  }, [data.groupedEntries.length]);

  return (
    <S.Container columns={columns}>
      <S.Handle type="target" position={Position.Top} />
      <S.Grid columns={columns}>
        {data.groupedEntries.map((entry) => (
          <ChildNode key={entry.id} data={entry} />
        ))}
      </S.Grid>
    </S.Container>
  );
};
