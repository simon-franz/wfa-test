import LoadingAnimation from '@hrworks/sui-core/LoadingAnimation';
import { FALLBACK_IMAGE_BASE64 } from '@hrworks/sui-shared/constants';
import { usePrevious } from '@hrworks/sui-shared/hooks/usePrevious';
import axios from 'axios';
import defaultsDeep from 'lodash/defaultsDeep';
import type { LottieRefCurrentProps } from 'lottie-react';
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { S } from './AfterEffectsMedia.styles';
import type { AfterEffectsMediaProps } from './AfterEffectsMedia.types';

const Lottie = lazy(() => import('lottie-react'));

export const AfterEffectsMedia = ({
  url,
  speed = 1,
  loop = true,
  loopStartFrame = 0,
  loopEndFrame,
  paint,
  alt,
  ...otherProps
}: AfterEffectsMediaProps) => {
  const [media, setMedia] = useState<unknown>('loading');
  const [endFrame, setEndFrame] = useState<number>(0);
  const previousLoop = usePrevious(loop);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const fetchMedia = useCallback(async (url: string) => {
    try {
      const response = await axios.get(url);
      setMedia(response.data);
      setEndFrame(response.data.op);
    } catch {
      setMedia(null);
      console.error('Animation could not be loaded');
    }
  }, []);

  useEffect(() => {
    if (!url) {
      setMedia(null);

      return;
    }
    fetchMedia(url);
  }, [url, fetchMedia]);

  useEffect(() => {
    if (speed < 0) {
      lottieRef.current?.setSpeed(0);
    } else {
      lottieRef.current?.setSpeed(speed);
    }
  }, [speed]);

  useEffect(() => {
    if (loop && !previousLoop) {
      lottieRef.current?.play();
    }
  }, [loop, previousLoop]);

  const safeStartFrame = useMemo(
    () =>
      loopStartFrame < 0 || loopStartFrame > endFrame || (loopEndFrame && loopStartFrame >= loopEndFrame)
        ? 0
        : loopStartFrame,
    [loopStartFrame, loopEndFrame, endFrame],
  );

  const safeEndFrame = useMemo(
    () =>
      !loopEndFrame || loopEndFrame < 0 || loopEndFrame > endFrame || loopEndFrame <= loopStartFrame
        ? endFrame
        : loopEndFrame,
    [loopStartFrame, loopEndFrame, endFrame],
  );

  const playSegments = useCallback(() => {
    if (loop) {
      lottieRef.current?.playSegments([safeStartFrame, safeEndFrame]);
    }
  }, [loop, safeStartFrame, safeEndFrame]);

  const lottieStyles = useMemo(() => S.generateSvgPaintStyles(defaultsDeep({}, paint, S.svgConfig)), [paint]);

  if (url === null || url === '') {
    return null;
  }

  if (!media) {
    return <img src={FALLBACK_IMAGE_BASE64} alt={alt} data-faulty-url={url} />;
  }

  if (media === 'loading') {
    return <LoadingAnimation type="spinner" />;
  }

  return (
    <Suspense fallback={null}>
      <Lottie
        animationData={media}
        css={lottieStyles}
        lottieRef={lottieRef}
        loop={false}
        onComplete={playSegments}
        alt={alt}
        {...otherProps}
      />
    </Suspense>
  );
};
