import { FALLBACK_IMAGE_BASE64 } from '@hrworks/sui-shared/constants';
import { type KeyboardEvent, type SyntheticEvent, useEffect, useRef, useState } from 'react';

import { S } from './Image.styles';
import type { ImageProps } from './Image.types';

export const Image = ({ src, fallbackConfig = {}, corner, fullWidth = true, onClick, ...otherProps }: ImageProps) => {
  const [shortEdge, setShortEdge] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [autoDimension, setAutoDimension] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>(src);
  const [hasTriedToLoadFallbackImage, setHasTriedToLoadFallbackImage] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const actualNumberOfRetriesRef = useRef(0);
  const retryTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const { fallbackSrc, numberOfRetries = 0, retryInterval = 30_000 } = fallbackConfig;

  useEffect(() => {
    if (!fullWidth && corner === 'circular' && imageRef.current) {
      const imgRef = imageRef.current;

      const resizeObserver = new ResizeObserver(() => {
        setAutoDimension(
          // set width and height to 'auto' as soon as one dimension side
          // become shorter than the calculated shortEdge
          (imgRef.clientHeight < shortEdge || imgRef.clientWidth < shortEdge) ?? false,
        );
      });
      resizeObserver.observe(imageRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [fullWidth, corner, shortEdge]);

  useEffect(() => {
    // To simplyfy things if src or fallbackConfig change reset all the retry logic.
    setHasTriedToLoadFallbackImage(false);
    actualNumberOfRetriesRef.current = 0;

    return () => {
      clearTimeout(retryTimerRef.current);
    };
  }, [src, fallbackSrc, numberOfRetries, retryInterval]);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  // As per requirement show nothing if src is nullish.
  if (!src) {
    return null;
  }

  const _numberOfRetries = numberOfRetries === 'infinite' || numberOfRetries >= 0 ? numberOfRetries : 0;

  const onLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const { naturalHeight, naturalWidth } = event.target as HTMLImageElement;
    const newShortEdge = naturalHeight < naturalWidth ? naturalHeight : naturalWidth;
    shortEdge !== newShortEdge && setShortEdge(newShortEdge);
    setImageWidth(naturalWidth);
    setImageHeight(naturalHeight);
  };

  const tryToReloadOriginalImageAfterRetryInterval = async () => {
    retryTimerRef.current = setTimeout(
      () => {
        setImageSrc(src);
        setHasTriedToLoadFallbackImage(false);
      },
      Math.max(retryInterval, 1000),
    );
  };

  const onError = async () => {
    if (hasTriedToLoadFallbackImage || !fallbackSrc) {
      // if neither the original image nor the fallback image is available set an base64 image as last resort.
      setImageSrc(FALLBACK_IMAGE_BASE64);
    } else {
      // If the original image is not available try to load a fallback image.
      setImageSrc(fallbackSrc);
      setHasTriedToLoadFallbackImage(true);
    }

    // If numberOfRetries is infinite the actualNumberOfRetriesRef is irrelevant.
    if (_numberOfRetries === 'infinite') {
      return await tryToReloadOriginalImageAfterRetryInterval();
    }

    if (actualNumberOfRetriesRef.current < _numberOfRetries) {
      actualNumberOfRetriesRef.current++;
      await tryToReloadOriginalImageAfterRetryInterval();
    }
  };

  const onKeyDown =
    onClick &&
    ((event: KeyboardEvent<HTMLElement>) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        onClick?.(event);
      }
    });

  return (
    <S.Image
      ref={imageRef}
      src={imageSrc}
      data-faulty-src={src}
      fullWidth={fullWidth}
      corner={corner}
      shortEdge={shortEdge}
      imageWidth={imageWidth}
      imageHeight={imageHeight}
      autoDimension={autoDimension}
      onLoad={onLoad}
      onError={onError}
      onKeyDown={onKeyDown}
      onClick={onClick}
      tabIndex={onClick && 0}
      {...otherProps}
    />
  );
};
