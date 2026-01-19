import { useTheme } from '@emotion/react';
import {
  arrow,
  autoUpdate,
  flip,
  hide,
  inline,
  limitShift,
  offset,
  type Placement,
  shift,
  size,
  useFloating,
} from '@floating-ui/react-dom';
import { useWindowWidth } from '@react-hook/window-size';
import compact from 'lodash/compact';
import last from 'lodash/last';
import { useEffect, useMemo, useRef, useState } from 'react';

import { fallbackPlacements as fallbackPlacementsMap } from './fallbackPlacements';

type UseFloatProps = {
  show: boolean;
  zIndex?: string;
  placement?: Placement;
  fallbackPlacements?: Array<Placement>;
  alignmentAxisOffset?: number | OffsetPlacementType;
  mainAxisOffset?: number | OffsetPlacementType;
  flip?: boolean;
  inline?: boolean;
  arrow?: boolean;
  arrowPadding?: number;
  arrowOffset?: number;
  shift?: boolean;
  shiftOffset?: number;
  scroll?: boolean;
  strategy?: 'fixed' | 'absolute';
  fallbackStrategy?: 'bestFit' | 'initialPlacement';
  flipOffset?: number;
};

type OffsetPlacementType = {
  [key in Placement]?: number;
};

export type StaticSide = 'top' | 'right' | 'bottom' | 'left';

export const useFloat = ({
  show = false,
  zIndex,
  placement: placementFromProps = 'bottom',
  inline: inlineFromProps = false,
  fallbackPlacements,
  scroll: shouldScroll = true,
  shift: shouldShift = false,
  shiftOffset = 0,
  mainAxisOffset = 4,
  flip: shouldFlip,
  flipOffset = 0,
  arrowPadding = 2,
  arrowOffset = 0,
  alignmentAxisOffset = 0,
  arrow: hasArrow,
  strategy: strategyFromProps = 'fixed',
  fallbackStrategy = 'bestFit',
}: UseFloatProps) => {
  const windowWidth = useWindowWidth({ wait: 64 });
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const currentTheme = useTheme();
  const _zIndex = zIndex || currentTheme.marko.variables.zIndex.popover;

  placementFromProps = useMemo(
    () =>
      typeof placementFromProps === 'object'
        ? (last(
            Object.entries(placementFromProps).filter(([width]) => (width as unknown as number) < windowWidth),
          )![1] as Placement)
        : placementFromProps,
    [placementFromProps, windowWidth],
  );

  // using state instead of refs so that it actually gets rerendered
  const [calculatedHeight, setCalculatedHeight] = useState<number | undefined>();
  const [calculatedWidth, setCalculatedWidth] = useState<number | undefined>();
  const anchorWidth = useRef<number | undefined>(undefined);

  // to set the offset based on the placement
  const getOffset = (placement: Placement, offset: number | OffsetPlacementType): number => {
    if (typeof offset === 'number') {
      return offset;
    } else if (typeof offset === 'object' && offset[placement] !== undefined) {
      return offset[placement]!;
    }

    return 0;
  };

  const { x, y, strategy, middlewareData, placement, refs, update } = useFloating<HTMLElement>({
    placement: placementFromProps,
    strategy: strategyFromProps,
    middleware: compact([
      offset({
        alignmentAxis: getOffset(placementFromProps, alignmentAxisOffset),
        mainAxis: getOffset(placementFromProps, mainAxisOffset),
      }),
      inlineFromProps && inline(),
      shouldFlip &&
        flip({
          fallbackPlacements: fallbackPlacements || fallbackPlacementsMap[placementFromProps],
          fallbackStrategy,
          crossAxis: false,
          padding: flipOffset, // when setting padding the float only flips when it doesnt need a scrollbar at the fallback placement
        }),
      shouldScroll &&
        size({
          padding: flipOffset,
          apply({ availableHeight, availableWidth, rects }) {
            setCalculatedHeight(availableHeight);
            setCalculatedWidth(availableWidth);
            anchorWidth.current = rects.reference.width;
          },
        }),
      shouldScroll && hide(),
      shouldShift && shift({ limiter: limitShift({ offset: shiftOffset }) }),
      hasArrow && arrow({ element: arrowRef, padding: arrowPadding }),
    ]),
  });

  const isHidden = middlewareData.hide?.referenceHidden;
  const isTop = useMemo(() => placement.startsWith('top'), [placement]);
  const isBottom = useMemo(() => placement.startsWith('bottom'), [placement]);
  const isLeft = useMemo(() => placement.startsWith('left'), [placement]);
  const isRight = useMemo(() => placement.startsWith('right'), [placement]);

  const staticSide: StaticSide = placement.split('-')[0] as StaticSide;

  // Without this useEffect nothing works as it tells he float when to update
  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current || !show) {
      return;
    }

    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference, refs.floating, update, show]);

  const floatingStyles = useMemo(() => {
    if (!show || isHidden) {
      return { display: 'none' };
    }

    return {
      position: strategy,
      maxHeight: calculatedHeight,
      maxWidth: calculatedWidth,
      top: typeof y === 'number' ? (isTop ? y - arrowOffset : isBottom ? y + arrowOffset : y) : '',
      left: typeof x === 'number' ? (isLeft ? x - arrowOffset : isRight ? x + arrowOffset : x) : '',
      zIndex: _zIndex,
    };
  }, [
    show,
    isHidden,
    strategy,
    calculatedHeight,
    calculatedWidth,
    y,
    isTop,
    arrowOffset,
    isBottom,
    x,
    isLeft,
    isRight,
    _zIndex,
  ]);

  const getTransformArrow = useMemo(
    () => (staticSide: StaticSide) => {
      const transformDegrees = {
        top: { deg: 0, translate: '' },
        right: { deg: 90, translate: 'translateY(-50%)' },
        bottom: { deg: 180, translate: '' },
        left: { deg: 270, translate: 'translateY(-50%)' },
      };

      const { deg, translate } = transformDegrees[staticSide];

      return `rotate(${deg}deg) ${translate}`;
    },
    [],
  );

  const arrowStyles = useMemo(() => {
    if ((!hasArrow && !show) || isHidden) {
      return { display: 'none' };
    }

    return {
      position: 'absolute' as any,
      left: middlewareData.arrow?.x ? `${middlewareData.arrow?.x}px` : staticSide === 'left' ? '100%' : '',
      top: middlewareData.arrow?.y ? `${middlewareData.arrow?.y}px` : staticSide === 'top' ? '100%' : '',
      right: staticSide === 'right' ? '100%' : '',
      bottom: staticSide === 'bottom' ? '100%' : '',
      transform: getTransformArrow(staticSide),
      transformOrigin: '',
    };
  }, [getTransformArrow, hasArrow, isHidden, middlewareData.arrow?.x, middlewareData.arrow?.y, show, staticSide]);

  return {
    refs,
    floatingStyles,
    arrowStyles,
    arrowRef,
    placement,
    staticSide,
    calculatedHeight,
  };
};
