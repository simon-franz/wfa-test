import { useTheme } from '@emotion/react';
import { FloatingPortal } from '@floating-ui/react';
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
  type SideObject,
  size,
  useFloating,
} from '@floating-ui/react-dom';
import { useWindowWidth } from '@react-hook/window-size';
import compact from 'lodash/compact';
import last from 'lodash/last';
import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { fallbackPlacements as fallbackPlacementsMap } from './fallbackPlacements';
import { FloatContext } from './FloatContext';

export type FloatRefType = ReturnType<typeof useFloating>['refs']['setFloating'];

export type FloatRenderFunctionProps = {
  anchorRef: ReturnType<typeof useFloating>['refs']['setReference'];
  anchorWidth?: number;
  calculatedHeight?: number;
  calculatedWidth?: number;
  floatRef: FloatRefType;
  getFloatStyles: () => CSSProperties;
  arrowRef: RefObject<HTMLDivElement | null>;
  getArrowStyles: () => CSSProperties;
  placement: Placement;
  portal: (children: ReactNode) => ReactNode;
};

export type FloatPropsType = {
  children: (props: FloatRenderFunctionProps) => ReactNode;
  arrow?: boolean;
  arrowOffset?: number;
  arrowPadding?: number;
  arrowFlip?: boolean;
  show?: boolean;
  fallbackPlacements?: Array<Placement>;
  flip?: boolean;
  flipOffset?: number | Partial<SideObject>;
  inline?: boolean;
  offset?: Parameters<typeof offset>[0];
  placement?: Placement | { [key: number]: Placement };
  shift?: boolean | 'fixed';
  shiftOffset?: number;
  scroll?: boolean;
  scrollOffset?: number;
  zIndex?: number | string;
} & Omit<HTMLAttributes<HTMLElement>, 'children'>;

export function Float({
  arrow: hasArrow,
  arrowOffset = 0,
  arrowPadding = 2,
  arrowFlip: arrowFlipFromProps = true,
  children,
  fallbackPlacements,
  flip: shouldFlip = true,
  flipOffset = 12,
  inline: inlineFromProps = false,
  offset: offsetValue = 4,
  placement: placementFromProps = 'bottom',
  shift: shouldShift = false,
  shiftOffset = 0,
  show,
  scroll: shouldScroll = false,
  scrollOffset = 12,
  style: styleFromProps = {},
  zIndex,
}: FloatPropsType) {
  const arrowRef = useRef<HTMLDivElement>(null);

  const windowWidth = useWindowWidth({ wait: 64 });

  const currentTheme = useTheme();

  const _zIndex = zIndex || currentTheme.marko.variables.zIndex.popover;

  const resolvedPlacement = useMemo(
    () =>
      typeof placementFromProps === 'object'
        ? last(Object.entries(placementFromProps).filter(([width]) => (width as unknown as number) < windowWidth))![1]
        : placementFromProps,
    [placementFromProps, windowWidth],
  );

  const calculatedHeight = useRef<number | undefined>(undefined);
  const calculatedWidth = useRef<number | undefined>(undefined);
  const anchorWidth = useRef<number | undefined>(undefined);

  const { x, y, strategy, placement, refs, update, middlewareData } = useFloating({
    placement: resolvedPlacement,
    strategy: shouldShift === 'fixed' ? 'fixed' : shouldShift ? 'absolute' : 'fixed',
    middleware: compact([
      offset(offsetValue),
      inlineFromProps && inline(),

      shouldFlip &&
        flip({
          fallbackPlacements: fallbackPlacements || fallbackPlacementsMap[resolvedPlacement],
          fallbackStrategy: 'initialPlacement',
          padding: flipOffset as Required<FloatPropsType['flipOffset']>,
          crossAxis: false,
        }),
      shouldScroll &&
        size({
          padding: flipOffset as Required<FloatPropsType['flipOffset']>,
          apply({ availableHeight, elements, availableWidth, rects }) {
            calculatedHeight.current = Math.max(50 + scrollOffset, availableHeight) - scrollOffset;
            calculatedWidth.current = Math.max(50 + scrollOffset, availableWidth) - scrollOffset;
            anchorWidth.current = rects.reference.width;
            Object.assign(elements.floating.style, {
              maxHeight: `${calculatedHeight}px`,
            });
          },
        }),
      shouldScroll && hide(),
      shouldShift && shift({ limiter: limitShift({ offset: shiftOffset }) }),
      hasArrow && arrow({ element: arrowRef, padding: arrowPadding }),
    ]),
  });

  const staticSide = placement.split('-')[0];

  const isTop = useMemo(() => placement.startsWith('top'), [placement]);
  const isBottom = useMemo(() => placement.startsWith('bottom'), [placement]);
  const isLeft = useMemo(() => placement.startsWith('left'), [placement]);
  const isRight = useMemo(() => placement.startsWith('right'), [placement]);
  const isHidden = useMemo(() => middlewareData.hide?.referenceHidden, [middlewareData]);

  const shouldArrowCSSFlip = arrowFlipFromProps && middlewareData.flip?.index;

  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current || !show) {
      return;
    }

    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference, refs.floating, update, show]);

  const renderFunctionProps: FloatRenderFunctionProps = {
    anchorRef: refs.setReference,
    anchorWidth: anchorWidth.current,
    calculatedHeight: calculatedHeight.current,
    calculatedWidth: calculatedWidth.current,
    floatRef: refs.setFloating,
    getFloatStyles: () =>
      !show || isHidden
        ? { display: 'none' }
        : {
            position: strategy,
            top: typeof y === 'number' ? (isTop ? y - arrowOffset : isBottom ? y + arrowOffset : y) : '',
            left: typeof x === 'number' ? (isLeft ? x - arrowOffset : isRight ? x + arrowOffset : x) : '',
            zIndex: _zIndex,
            ...styleFromProps,
          },
    arrowRef,
    getArrowStyles: () =>
      (!hasArrow && !show) || isHidden
        ? { display: 'none' }
        : {
            position: 'absolute',
            left: middlewareData.arrow?.x ? `${middlewareData.arrow?.x}px` : staticSide === 'left' ? '100%' : '',
            top: middlewareData.arrow?.y ? `${middlewareData.arrow?.y}px` : staticSide === 'top' ? '100%' : '',
            right: staticSide === 'right' ? '100%' : '',
            bottom: staticSide === 'bottom' ? '100%' : '',
            transform: shouldArrowCSSFlip ? 'rotate(180deg)' : 'initial',
          },
    placement,
    portal: (children) => <FloatingPortal>{show && children}</FloatingPortal>,
  };

  return <FloatContext.Provider value={renderFunctionProps}>{children(renderFunctionProps)}</FloatContext.Provider>;
}
