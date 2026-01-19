import 'rc-slider/assets/index.css';

import { useTheme } from '@emotion/react';
import { WARNING_CODES } from '@hrworks/error-handling';
import { observer } from 'mobx-react';
import SliderReactComponent from 'rc-slider';
import { type HTMLAttributes, type ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useHover } from '@uidotdev/usehooks';

import { S } from './Slider.styles';
import type { SliderProps } from './Slider.types';

export const Slider = observer(
  ({
    min = 0,
    max = 100,
    step = 1,
    value = min,
    color = 'primary',
    showTrack = true,
    showTooltip,
    onValueChange,
    onValueChangeFinished,
    ...otherProps
  }: SliderProps) => {
    const [thumbValue, setThumbValue] = useState(value);
    const isValueChanging = useRef(false);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [ref, hovering] = useHover();

    const [minValue, maxValue] = useMemo(() => {
      if (min > max) {
        console.warn(WARNING_CODES.ILLEGAL_PROPS, `minValue (${min}) and maxValue (${max}) are reversed`);

        return [max, min];
      }

      return [min, max];
    }, [max, min]);

    useEffect(() => {
      let newValue = value;
      // Validate value; auto fix if necessary
      if (newValue < minValue) {
        console.warn(WARNING_CODES.ILLEGAL_PROPS, `value (${newValue}) less than determined minValue (${minValue})`);
        newValue = minValue;
      } else if (newValue > maxValue) {
        console.warn(WARNING_CODES.ILLEGAL_PROPS, `value (${newValue}) greater than determined maxValue (${maxValue})`);
        newValue = maxValue;
      }
      // keep thumbValue synced with new value (from other components)
      setThumbValue(newValue);
    }, [maxValue, minValue, value]);

    const onBlur = useCallback(() => {
      showTooltip && setIsTooltipVisible(false);
      if (isValueChanging.current) {
        onValueChangeFinished?.();
        isValueChanging.current = false;
      }
    }, [onValueChangeFinished, showTooltip]);

    const onChange = useCallback(
      (value: number | number[]) => {
        // Check for number only as we currently use a single thumb slider.
        // number array (number[]) is used for multiple thumbs on slider (<Range>)
        // See demo: https://slider-react-component.vercel.app/demo/range
        if (typeof value === 'number') {
          onValueChange && onValueChange(value);
          setThumbValue(value);
          isValueChanging.current = true;
          showTooltip && setIsTooltipVisible(true);
        }
      },
      [onValueChange, showTooltip],
    );

    const onFocus = () => {
      showTooltip && setIsTooltipVisible(true);
    };

    const pointerUp = useCallback(() => {
      showTooltip && setIsTooltipVisible(false);
      if (isValueChanging.current) {
        onValueChangeFinished?.();
        isValueChanging.current = false;
      }
    }, [onValueChangeFinished, showTooltip]);

    useEffect(() => {
      document.addEventListener('pointerup', pointerUp);

      return () => {
        document.removeEventListener('pointerup', pointerUp);
      };
    }, [pointerUp]);

    const handleRender = (renderProps: ReactElement<HTMLAttributes<HTMLElement>>) => (
      <S.SliderHandle $color={color}>
        <div {...renderProps.props} data-slider-tooltip={renderProps.props['aria-valuenow']} />
        {showTooltip && (
          <S.Tooltip
            playAnimation={showTooltip && (hovering || isTooltipVisible)}
            placement="right"
            style={{ left: renderProps.props.style?.left }}
          >
            {renderProps.props['aria-valuenow']}
          </S.Tooltip>
        )}
      </S.SliderHandle>
    );

    const currentTheme = useTheme();

    return (
      <S.SliderContainer $color={color} ref={ref} {...otherProps}>
        <SliderReactComponent
          min={minValue}
          max={maxValue}
          step={step}
          value={thumbValue}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          handleRender={handleRender}
          styles={{
            rail: S.sliderRailStyles(currentTheme),
            track: showTrack ? S.sliderTrackStyles(currentTheme, color) : { backgroundColor: 'transparent' },
          }}
        />
      </S.SliderContainer>
    );
  },
);
