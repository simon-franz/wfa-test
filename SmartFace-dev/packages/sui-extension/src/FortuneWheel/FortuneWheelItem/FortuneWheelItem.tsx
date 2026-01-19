import { observer } from 'mobx-react';
import { useContext, useEffect } from 'react';

import { FortuneWheelContextProps } from '../FortuneWheelContext';
import { calculateSegmentTextPosition, createArcPath, HALF_CIRCLE } from '../FortuneWheelHelper';
import { S } from './FortuneWheelItem.styles';
import type { FortuneWheelItemProps } from './FortuneWheelItem.types';

const FortuneWheelItem = observer(({ id, color, text, media, index = 0, ...otherProps }: FortuneWheelItemProps) => {
  const { currentSize, segMidAngle, strokeColor, fillColors, textColors, setChosenItemProps, chosenItemProps } =
    useContext(FortuneWheelContextProps);
  const { chosenItemIndex } = chosenItemProps;

  useEffect(() => {
    if (chosenItemIndex === index) {
      setChosenItemProps({ chosenItemId: id, chosenItemText: text });
    }
  }, [chosenItemIndex, id, index, setChosenItemProps, text]);

  const itemColor = color ?? fillColors[index];
  const itemTextColor = color ?? textColors[index];
  const startAngle = index * segMidAngle;
  const endAngle = startAngle + segMidAngle;
  const { x, y, midAngle } = calculateSegmentTextPosition(startAngle, endAngle, currentSize);
  const mediaX = currentSize * Math.cos((midAngle * Math.PI) / HALF_CIRCLE) + currentSize;
  const mediaY = currentSize * Math.sin((midAngle * Math.PI) / HALF_CIRCLE) + currentSize;
  const mediaSize = currentSize * 0.25;

  return (
    <g id={id} {...otherProps}>
      <S.ItemPath d={createArcPath(startAngle, endAngle, currentSize)} fill={itemColor} stroke={strokeColor} />
      {media && (
        <S.ItemMedia
          x={mediaX - mediaSize / 2}
          y={mediaY - mediaSize / 2}
          width={mediaSize}
          height={mediaSize}
          style={{ transform: `rotate(${midAngle + 90}deg)`, transformOrigin: `${mediaX}px ${mediaY}px` }}
        >
          {media}
        </S.ItemMedia>
      )}
      <S.ItemText
        style={{ transform: `rotate(${midAngle}deg)`, transformOrigin: `${x}px ${y}px` }}
        x={x}
        y={y}
        fill={itemTextColor}
      >
        {text}
      </S.ItemText>
    </g>
  );
});

export default FortuneWheelItem;
