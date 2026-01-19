import { type Node, Position } from '@xyflow/react';
import { useMemo } from 'react';

import type { TreeGraphEntryUiDataType } from '../TreeGraph.types';
import { ChildNode } from './ChildNode';
import { S } from './GroupNode.styles';

type DataType = {
  groupedEntries: TreeGraphEntryUiDataType[];
};

export const GroupNode = ({ data }: Omit<Node<DataType>, 'position'>) => {
  const columns = useMemo(() => {
    if (data.groupedEntries.length >= 4) {
      return 4;
    }

    return data.groupedEntries.length;
  }, [data.groupedEntries.length]);

  const allGreyedOut = data.groupedEntries.every((entry) => entry.variant === 'greyedOut');

  return (
    <S.Wrapper columns={columns} allGreyedOut={allGreyedOut}>
      <S.Handle type="target" position={Position.Top} />
      <S.Grid columns={columns}>
        {data.groupedEntries.map((entry: any) => (
          <ChildNode id={entry.id} key={entry.id} data={entry} allGreyedOut={allGreyedOut} />
        ))}
      </S.Grid>
    </S.Wrapper>
  );
};
