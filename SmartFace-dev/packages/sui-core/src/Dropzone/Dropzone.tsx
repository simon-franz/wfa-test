import { useTheme } from '@emotion/react';
import extractNumbersFromString from '@hrworks/sui-shared/functions/extractNumbersFromString';
import { observer } from 'mobx-react';
import type { Variants } from 'motion/react';
import { type MouseEvent, useCallback, useContext } from 'react';

import { HeadlessFileManagerContext } from '../FileManager';
import { S } from './Dropzone.styles';
import type { DropzoneProps } from './Dropzone.types';
import { HeadlessDropzone } from './HeadlessDropzone';

// TODO Fade-in is animated but fade-out is not
const alternativeChildrenAnimationVariants: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0, visibility: 'hidden' },
} as const;

const dropzoneAnimationVariants: Variants = {
  visible: { height: 'auto', opacity: 1 },
  hidden: { height: 0, opacity: 0 },
} as const;

export const Dropzone = observer(
  ({
    alternativeChildren,
    children,
    onDrop,
    mode,
    accept,
    maxFileAmount,
    disabled,
    isWindowDropzone,
    ...otherProps
  }: DropzoneProps) => {
    const onClick = useCallback((event: MouseEvent<HTMLElement>) => event.stopPropagation(), []);
    const animationDuration = Number(extractNumbersFromString(useTheme().marko.variables.animationDuration.long));

    const fileManagerContext = useContext(HeadlessFileManagerContext);
    const isFileManagerOrWindowDropzoneActive = fileManagerContext?.addFiles !== undefined || isWindowDropzone;

    return (
      <S.Wrapper {...otherProps}>
        <HeadlessDropzone
          onDrop={isFileManagerOrWindowDropzoneActive ? onDrop : () => null}
          mode={mode}
          accept={accept}
          maxFileAmount={maxFileAmount}
          disabled={disabled}
        >
          {({ getRootProps, getInputProps, isDragActive, isWindowDragActive }) => {
            const isDropzoneVisible = !alternativeChildren || isWindowDragActive;

            return (
              <>
                <input {...getInputProps()} data-get-form-data-ignore />
                {alternativeChildren && (
                  <S.OverlappingContainer
                    animate={isDropzoneVisible ? 'hidden' : 'visible'}
                    variants={alternativeChildrenAnimationVariants}
                    initial="visible"
                    transition={{ duration: animationDuration }}
                    onClick={onClick}
                  >
                    <S.AlternativeChildrenWrapper onClick={getRootProps()?.onClick}>
                      {alternativeChildren}
                    </S.AlternativeChildrenWrapper>
                  </S.OverlappingContainer>
                )}
                <S.DropzoneWrapper
                  $isDragActive={isDragActive}
                  $isWindowDropzone={isWindowDropzone}
                  $disabled={disabled}
                  animate={isDropzoneVisible ? 'visible' : 'hidden'}
                  variants={dropzoneAnimationVariants}
                  initial={alternativeChildren ? 'hidden' : 'visible'}
                  transition={{ duration: animationDuration }}
                  onClick={onClick}
                >
                  <S.Dropzone
                    isDragActive={isDragActive}
                    isWindowDropzone={isWindowDropzone}
                    disabled={disabled}
                    {...getRootProps({
                      tabIndex: alternativeChildren || disabled ? -1 : 0,
                    })}
                  >
                    {children}
                  </S.Dropzone>
                </S.DropzoneWrapper>
              </>
            );
          }}
        </HeadlessDropzone>
      </S.Wrapper>
    );
  },
);
