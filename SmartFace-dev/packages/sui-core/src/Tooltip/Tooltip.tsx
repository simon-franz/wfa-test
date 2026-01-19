import { useMediaQuery } from '@hrworks/design-system';
import { useFloat } from '@hrworks/sui-shared/components/Float/useFloat';
import { detectOS } from '@hrworks/sui-shared/functions/detectOS';
import { mergeRefs } from '@hrworks/sui-shared/functions/mergeRefs';
import { observer } from 'mobx-react';
import { type MouseEvent, type TouchEvent, useCallback, useEffect, useId, useRef, useState } from 'react';

import Portal from '../Portal';
import Text from '../Text';
import Title from '../Title';
import { S } from './Tooltip.styles';
import type { TooltipProps } from './Tooltip.types';

const LONG_INTERACTION_DURATION = 500;

export const Tooltip = observer(
  ({
    children,
    placement = 'top',
    html,
    htmlTag: Element = 'div',
    fullWidth,
    text,
    title,
    mainAxisOffset = 7,
    customTooltip,
    unstyledTrigger,
    trigger = 'longHoverOrLongTouch',
    ...otherProps
  }: TooltipProps) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const touchStartTimeRef = useRef<number | null>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const tooltipId = useId();
    const isTouchDevice = useMediaQuery('isTouchDevice');

    const clearTimer = useCallback(
      (event?: TouchEvent | MouseEvent) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        } else if (trigger === 'longHoverOrLongTouch') {
          event?.preventDefault();
        }
      },
      [trigger],
    );

    const onTooltipEnter = useCallback(() => {
      if (trigger === 'longHover' && isTouchDevice) {
        return;
      }

      const showTooltipWithDelay = () => {
        timerRef.current = setTimeout(() => {
          setShowTooltip(true);
          clearTimer();
        }, LONG_INTERACTION_DURATION);
      };

      switch (trigger) {
        case 'hoverOrTouch':
          setShowTooltip(true);
          break;
        case 'longHoverOrLongTouch':
          if (isTouchDevice) {
            touchStartTimeRef.current = Date.now();
          }
          showTooltipWithDelay();
          break;
        default:
          showTooltipWithDelay();
      }
    }, [clearTimer, isTouchDevice, trigger]);

    const onTooltipLeave = useCallback(
      (event: TouchEvent | MouseEvent) => {
        clearTimer(event);

        const handleTouchDevice = () => {
          if (trigger === 'longHoverOrLongTouch') {
            const touchDuration = touchStartTimeRef.current ? Date.now() - touchStartTimeRef.current : 0;
            if (touchDuration < LONG_INTERACTION_DURATION) {
              setShowTooltip(false);
            }
          }
        };

        const handleNonTouchDevice = () => {
          setShowTooltip(false);
        };

        isTouchDevice ? handleTouchDevice() : handleNonTouchDevice();

        touchStartTimeRef.current = null;
      },
      [clearTimer, isTouchDevice, trigger],
    );

    const handleClickOutside = (event: MouseEvent | FocusEvent | UIEvent) => {
      if (!triggerRef.current?.contains(event.target as HTMLElement)) {
        setShowTooltip(false);
      }
    };

    useEffect(() => {
      document.addEventListener('touchstart', handleClickOutside, { capture: true });

      return () => {
        document.removeEventListener('touchstart', handleClickOutside, { capture: true });
      };
    }, []);

    const {
      refs,
      floatingStyles,
      placement: actualPlacement,
    } = useFloat({
      show: showTooltip,
      placement,
      flip: true,
      shift: true,
      mainAxisOffset,
    });

    const { maxWidth, maxHeight, ...filteredStyles } = floatingStyles;

    // On iOS numbers were interpreted as phone numbers and added an underline and broke the layout. This prevents this behaviour. See: FE-1835
    const avoidNumberAutoDetectionOnSafari = (text: string) => {
      if (detectOS() !== 'iOS' || !text) {
        return text;
      }

      return text.replaceAll(/(\d)/g, '$1\u200B');
    };

    return (
      <>
        <S.Trigger
          onTouchStart={onTooltipEnter}
          onTouchEnd={onTooltipLeave}
          fullWidth={fullWidth}
          unstyledTrigger={unstyledTrigger}
          as={Element}
          ref={mergeRefs(refs.setReference, triggerRef)}
          {...(!isTouchDevice && { onMouseEnter: onTooltipEnter, onMouseLeave: onTooltipLeave })}
          {...(showTooltip && { 'aria-describedby': tooltipId })}
          {...otherProps}
        >
          {children}
        </S.Trigger>
        {showTooltip && (
          <Portal>
            <S.TooltipContainer
              playAnimation={showTooltip}
              placement={actualPlacement}
              id={tooltipId}
              role="tooltip"
              style={{ ...filteredStyles }}
              ref={refs.setFloating}
              isCustom={!!customTooltip}
            >
              {customTooltip || (
                <>
                  {title && <Title>{avoidNumberAutoDetectionOnSafari(title)}</Title>}
                  {text && (
                    <Text html={html} fontSize="small">
                      {avoidNumberAutoDetectionOnSafari(text)}
                    </Text>
                  )}
                </>
              )}
            </S.TooltipContainer>
          </Portal>
        )}
      </>
    );
  },
);
