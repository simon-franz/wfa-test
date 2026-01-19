import { useTheme } from '@emotion/react';
import Title from '@hrworks/sui-core/Title';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { observer } from 'mobx-react';
import { Children, cloneElement, type ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { S } from './FortuneWheel.styles';
import type { FortuneWheelProps } from './FortuneWheel.types';
import { FortuneWheelContextProps } from './FortuneWheelContext';
import { FULL_CIRCLE, generateColors, getChosenItem, radiusSizes } from './FortuneWheelHelper';
import FortuneWheelPointer from './FortuneWheelPointer/FortuneWheelPointer';
import FortuneWheelSpinButton from './FortuneWheelSpinButton/FortuneWheelSpinButton';

gsap.registerPlugin(Draggable);

export type ChosenItemProps = {
  chosenItemId?: string;
  chosenItemText?: string;
  chosenItemIndex?: number;
};

export const FortuneWheel = observer(
  ({ children, color = 'alternating', maxSize = 'medium', onSpinComplete }: FortuneWheelProps) => {
    const currentTheme = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const wheelRef = useRef(null);
    const [currentSize, setCurrentSize] = useState(radiusSizes[maxSize]);
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [chosenItemProps, setChosenItemProps] = useState<ChosenItemProps>({ chosenItemText: 'Spin the Wheel!' });

    const childCount = Children.count(children);
    const segMidAngle = FULL_CIRCLE / childCount;

    useEffect(() => {
      const updateSize = () => {
        if (containerRef.current) {
          const { width, height } = containerRef.current.getBoundingClientRect();
          const containerSize = Math.min(width, height);
          const maxRadius = radiusSizes[maxSize];
          const scaleFactor = Math.min(containerSize / (maxRadius * 2), 1);
          setCurrentSize(maxRadius * scaleFactor);
        }
      };

      window.addEventListener('resize', updateSize);
      updateSize();

      return () => window.removeEventListener('resize', updateSize);
    }, [maxSize]);

    const { fillColors, strokeColor, textColors } = useMemo(
      () => generateColors(childCount, color, currentTheme),
      [childCount, color, currentTheme],
    );

    const contextValue = useMemo(
      () => ({
        currentSize,
        segMidAngle,
        strokeColor,
        fillColors,
        textColors,
        chosenItemProps,
        setChosenItemProps,
      }),
      [chosenItemProps, currentSize, fillColors, segMidAngle, strokeColor, textColors],
    );

    const handleOnSpinComplete = useCallback(
      (chosenId: string) => {
        onSpinComplete && onSpinComplete(chosenId);
      },
      [onSpinComplete],
    );

    const { chosenItemId, chosenItemText } = chosenItemProps;

    const updateChosenItem = useCallback(
      (newRotation: number) => {
        const chosenItemIndex = getChosenItem(newRotation, childCount, segMidAngle);
        setChosenItemProps((prevState) => ({ ...prevState, chosenItemIndex }));
      },
      [childCount, segMidAngle],
    );

    useEffect(() => {
      chosenItemId && handleOnSpinComplete(chosenItemId);
    }, [chosenItemId, handleOnSpinComplete]);

    const onWheelStart = () => {
      setChosenItemProps({ chosenItemText: 'Hold on...' });
    };

    useEffect(() => {
      if (wheelRef.current && !isSpinning) {
        let startRotation = 0;
        let lastDragRotation = 0;
        const draggable = Draggable.create(wheelRef.current, {
          type: 'rotation',
          inertia: true,
          onDragStart: function () {
            setIsDragging(true);
            startRotation = this.rotation;
            lastDragRotation = this.rotation;
          },
          onDrag: function () {
            const currentRotation = this.rotation;
            const dragDelta = currentRotation - lastDragRotation;
            const lagFactor = 0.2;
            const newRotation = lastDragRotation + dragDelta * lagFactor;

            setRotation(newRotation);
            gsap.set(wheelRef.current, { rotation: newRotation });
            lastDragRotation = newRotation;
          },
          onDragEnd: function () {
            setIsSpinning(true);
            onWheelStart();
            setIsDragging(false);
            const endRotation = this.rotation;
            const velocity = (endRotation - startRotation) * 2;

            gsap.to(wheelRef.current, {
              rotation: `+=${velocity}`,
              duration: 3,
              ease: 'power2.out',
              onUpdate: () => {
                const currentRotation = gsap.getProperty(wheelRef.current, 'rotation') as number;
                setRotation(currentRotation);
              },
              onComplete: () => {
                const finalRotation = gsap.getProperty(wheelRef.current, 'rotation') as number;
                updateChosenItem(finalRotation);
                setIsSpinning(false);
              },
            });
          },
        })[0];

        return () => {
          draggable.kill();
        };
      }
    }, [isSpinning, updateChosenItem]);

    const onSpinClicked = () => {
      if (isSpinning || isDragging) return;

      setIsSpinning(true);
      onWheelStart();

      const minTurns = 4;
      const maxTurns = 8;
      const randomTurns = Math.floor(Math.random() * (maxTurns - minTurns + 1)) + minTurns;
      const randomDegrees = randomTurns * FULL_CIRCLE + Math.floor(Math.random() * FULL_CIRCLE);
      const newRotation = rotation + randomDegrees;

      gsap.to(wheelRef.current, {
        rotation: newRotation,
        duration: 5,
        ease: 'power2.inOut',
        onUpdate: () => {
          const currentRotation = gsap.getProperty(wheelRef.current, 'rotation') as number;
          setRotation(currentRotation);
        },
        onComplete: () => {
          updateChosenItem(newRotation);
          setIsSpinning(false);
        },
      });
    };

    return (
      <FortuneWheelContextProps.Provider value={contextValue}>
        <S.Container ref={containerRef}>
          <Title>{chosenItemText}</Title>
          <S.FortuneWheelContainer style={{ maxWidth: `${currentSize * 2}px`, margin: `${currentSize * 0.25}px` }}>
            <S.FortuneWheelSvg ref={wheelRef} id="fortuneWheel" viewBox={`0 0 ${currentSize * 2} ${currentSize * 2}`}>
              {Children.map(children, (child, index) =>
                // @ts-expect-error: Adding index prop to child element
                cloneElement(child as ReactElement, { index }),
              )}
            </S.FortuneWheelSvg>
            <FortuneWheelPointer />
            <FortuneWheelSpinButton onClick={onSpinClicked} disabled={isSpinning || isDragging} />
          </S.FortuneWheelContainer>
        </S.Container>
      </FortuneWheelContextProps.Provider>
    );
  },
);
