import type { Theme } from '@emotion/react';
import { colors } from '@hrworks/types/shared/UiTypes';

import { getFortuneWheelColorMap } from './FortuneWheel.colors';
import type { FortuneWheelProps } from './FortuneWheel.types';

export const FULL_CIRCLE = 360;
export const HALF_CIRCLE = FULL_CIRCLE / 2;

export const radiusSizes = {
  extraSmall: 150,
  small: 200,
  medium: 250,
  large: 300,
  extraLarge: 350,
};

export const createArcPath = (startAngle: number, endAngle: number, radius: number) => {
  const x1 = radius * Math.cos((startAngle * Math.PI) / HALF_CIRCLE) + radius;
  const y1 = radius * Math.sin((startAngle * Math.PI) / HALF_CIRCLE) + radius;
  const x2 = radius * Math.cos((endAngle * Math.PI) / HALF_CIRCLE) + radius;
  const y2 = radius * Math.sin((endAngle * Math.PI) / HALF_CIRCLE) + radius;

  return `
      M ${radius} ${radius}
      L ${x1} ${y1}
      A ${radius} ${radius} 0 0 1 ${x2} ${y2}
      Z
    `;
};

export const calculateSegmentTextPosition = (startAngle: number, endAngle: number, radius: number) => {
  const midAngle = (startAngle + endAngle) / 2;
  const x = (radius / 2) * Math.cos((midAngle * Math.PI) / HALF_CIRCLE) + radius;
  const y = (radius / 2) * Math.sin((midAngle * Math.PI) / HALF_CIRCLE) + radius;

  return { x, y, midAngle };
};

export const getChosenItem = (rotation: number, segmentCount: number, segmentAngle: number) => {
  const rotateInDegrees = ((rotation % FULL_CIRCLE) + FULL_CIRCLE) % FULL_CIRCLE;
  let smallestDifference = FULL_CIRCLE + 1;
  let closestSegmentIndex = 0;

  for (let index = 0; index < segmentCount; index++) {
    const startAngle = index * segmentAngle;
    const endAngle = startAngle + segmentAngle;
    const segmentMidAngle = (startAngle + endAngle) / 2;
    const adjustedAngle =
      (FULL_CIRCLE - ((segmentMidAngle + rotateInDegrees) % FULL_CIRCLE) + FULL_CIRCLE) % FULL_CIRCLE;
    const difference = Math.min(adjustedAngle, FULL_CIRCLE - adjustedAngle);

    if (difference < smallestDifference) {
      smallestDifference = difference;
      closestSegmentIndex = index;
    }
  }

  return closestSegmentIndex;
};

export const generateColors = (
  childCount: number,
  color: Required<FortuneWheelProps>['color'],
  currentTheme: Theme,
) => {
  const colorMap = getFortuneWheelColorMap(currentTheme);
  type ValidColor = (typeof colors)[number][];

  const getUniqueRandomColors = (count: number, availableColors: typeof colors): ValidColor => {
    if (count > availableColors.length) {
      const repeated: ValidColor = [];
      for (let i = 0; i < count; i++) {
        repeated.push(availableColors[i % availableColors.length]);
      }

      return repeated.sort(() => Math.random() - 0.5);
    }
    const shuffled = [...availableColors].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, count);
  };

  const getFillAndTextColor = (index: number, uniqueRandomColors?: ValidColor) => {
    switch (color) {
      case 'random': {
        const selectedColor = uniqueRandomColors
          ? uniqueRandomColors[index]
          : colors[Math.floor(Math.random() * colors.length)];

        return { fillcolor: colorMap[selectedColor].backgroundColor, textcolor: colorMap[selectedColor].color };
      }
      case 'alternating': {
        return index % 2 === 0
          ? { fillcolor: colorMap['alternating'].backgroundColor, textcolor: colorMap['alternating'].color }
          : { fillcolor: colorMap['secondary'].backgroundColor, textcolor: colorMap['secondary'].color };
      }
      default: {
        return { fillcolor: colorMap[color].backgroundColor, textcolor: colorMap[color].color };
      }
    }
  };

  const uniqueRandomColors = color === 'random' ? getUniqueRandomColors(childCount, colors) : undefined;
  const colorsData = Array.from({ length: childCount }, (_, index) => getFillAndTextColor(index, uniqueRandomColors));
  const fillColors = colorsData.map((item) => item.fillcolor);
  const textColors = colorsData.map((item) => item.textcolor);

  switch (color) {
    case 'random': {
      const random = Math.floor(Math.random() * colors.length);
      const strokeColor = colorMap[colors[random]].borderColor;

      return { fillColors, strokeColor, textColors };
    }
    default: {
      const strokeColor = colorMap[color].borderColor;

      return { fillColors, strokeColor, textColors };
    }
  }
};
