import styled from '@emotion/styled';
import { detectBrowser } from '@hrworks/sui-shared/functions/detectBrowser';
import { useMemo } from 'react';

import type { ImageProps as _ImageProps } from './Image.types';

const componentConfig = {
  borderRadius: 12,
};

const getAspectRatioFromPropAsNumbers = (aspectRatio?: string): Array<number> => {
  if (aspectRatio) {
    const nums = aspectRatio.split('/');
    if (nums.length == 2) {
      const ratioWidth = nums[0];
      const ratioHeight = nums[1];
      if (!Number.isNaN(ratioWidth) && !Number.isNaN(ratioHeight)) {
        return [Number(ratioWidth), Number(ratioHeight)];
      }
    }
  }

  return [0, 0];
};

const calcBorderRadius = (
  imageWidth: number,
  imageHeight: number,
  aspectRatioWidth: number,
  aspectRatioHeight: number,
) => {
  let borderRadiusX = componentConfig.borderRadius;
  let borderRadiusY = componentConfig.borderRadius;
  if (imageWidth && imageHeight) {
    if (aspectRatioWidth > 0 && aspectRatioHeight > 0) {
      // Recalculate width and height sizes if aspectRatio prop is set
      imageWidth = imageHeight * (aspectRatioWidth / aspectRatioHeight);
      imageHeight = imageWidth * (aspectRatioHeight / aspectRatioWidth);
    }
    imageWidth < imageHeight
      ? (borderRadiusX = (imageWidth * componentConfig.borderRadius) / imageHeight)
      : (borderRadiusY = (imageHeight * componentConfig.borderRadius) / imageWidth);
  }

  return {
    borderRadius: `${borderRadiusY}% / ${borderRadiusX}%`,
  };
};

/**
 * To prevent the image becoming oversized set either width or height
 * depending on which dimension side of the image is greater than the other
 * e.g. 16:9 -> set width | 9:16 -> set height
 * however, if the custom aspectRatio would oversize the shorter
 * dimension side instead, set the shorter dimension side,
 * for example:
 * - original image ratio: 16:9 (480px x 270px)
 * - aspectRatio: '4 / 3' (prop)
 * -> width (4) is greater than height (3) but check height size next
 * -> height: 480px * (3 / 4) = 360px > 270px = oversized!
 * => ignore width and set height instead (270px)
 */
const setOneDimensionSide = (
  imageWidth: number,
  imageHeight: number,
  aspectRatioWidth: number,
  aspectRatioHeight: number,
) => {
  const width = {
    width: imageWidth,
  };
  const height = {
    height: imageHeight,
  };

  return aspectRatioWidth > aspectRatioHeight
    ? imageHeight < imageWidth * (aspectRatioHeight / aspectRatioWidth)
      ? height
      : width
    : aspectRatioHeight > aspectRatioWidth
      ? imageWidth < imageHeight * (aspectRatioWidth / aspectRatioHeight)
        ? width
        : height
      : imageWidth < imageHeight
        ? width
        : height;
};
type ImageProps = Pick<_ImageProps, 'fullWidth' | 'corner' | 'aspectRatio'> & {
  shortEdge: number;
  imageWidth: number;
  imageHeight: number;
  autoDimension: boolean;
};

const Image = styled.img<ImageProps>(
  ({ theme, fullWidth, corner, shortEdge, aspectRatio, imageWidth, imageHeight, autoDimension, onClick }) => {
    const [aspectRatioWidth, aspectRatioHeight] = getAspectRatioFromPropAsNumbers(aspectRatio);
    const isNotFirefox = useMemo(() => detectBrowser() !== 'Firefox', []);

    return {
      maxWidth: '100%',
      maxHeight: '100%',
      ...(fullWidth
        ? {
            display: 'block',
          }
        : {
            verticalAlign: 'top',
          }),
      ...(aspectRatio && {
        aspectRatio,
        objectFit: 'cover',
        ...setOneDimensionSide(imageWidth, imageHeight, aspectRatioWidth, aspectRatioHeight),
      }),
      ...(fullWidth && {
        width: '100%',
        height: '100%',
        ...(!aspectRatio && {
          objectFit: 'contain',
        }),
      }),
      ...(corner === 'rounded' && {
        ...calcBorderRadius(imageWidth, imageHeight, aspectRatioWidth, aspectRatioHeight),
      }),
      ...(corner === 'circular' && {
        aspectRatio: 1,
        borderRadius: '100%',
        objectFit: 'cover',
        ...(!fullWidth && {
          width: autoDimension && isNotFirefox ? 'auto' : shortEdge,
          height: autoDimension ? 'auto' : shortEdge,
        }),
      }),
      ...(onClick && {
        cursor: 'pointer',

        '&:focus-visible': {
          outlineColor: theme.sqwTier2Color.border.focus,
          outlineStyle: 'solid',
          outlineWidth: 2,
          outlineOffset: 2,
        },
      }),
    };
  },
);

export const S = {
  Image,
} as const;
