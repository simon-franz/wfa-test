import { S } from './ArrowMarker.styles';
import type { ArrowMarkerProps } from './ArrowMarker.types';

export const ArrowMarker = ({ color, id }: ArrowMarkerProps) => {
  return (
    <svg>
      <defs>
        <marker
          id={`arrowhead-end-${id}`}
          viewBox="0 0 11 10"
          refX="10"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          {/* The rect is used here to hide the part of the edge that sticks out so that we can make 
the spaces look even to the eye. */}
          <S.BackgroundRect x="9" y="0" width="7" height="7" />
          <S.ArrowPath d="M4,1 L9,5 L4,9" color={color} />
        </marker>

        <marker
          id={`arrowhead-start-${id}`}
          viewBox="0 0 11 10"
          refX="0.1"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          {/* The rect is used here to hide the part of the edge that sticks out so that we can make 
the spaces look even to the eye. */}
          <S.BackgroundRect x="-1" y="1.5" width="3" height="7" />
          <S.ArrowPath d="M6,1 L1,5 L6,9" color={color} />
        </marker>
      </defs>
    </svg>
  );
};
