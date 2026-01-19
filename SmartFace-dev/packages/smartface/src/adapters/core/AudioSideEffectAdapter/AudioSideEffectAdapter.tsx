import { observer } from 'mobx-react';
import { useCallback, useContext, useEffect, useRef } from 'react';

import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { AudioSideEffectAdapterPropsType } from '../../../types/core/AudioSideEffectType';
import type { DeleteUpdateType } from '../../../types/shared/BackendResponseType/UpdateTypes';

export const AudioSideEffectAdapter = observer(({ id, volume, loop, src }: AudioSideEffectAdapterPropsType) => {
  const { queueBackendPatches, applyUpdates } = useContext(SmartFaceContext);
  const audioRef = useRef(new Audio(src));

  const updateVolume = (newVal: number) => {
    audioRef.current.volume = newVal >= 0 && newVal <= 100 ? newVal / 100 : newVal < 0 ? 0 : 1;
  };

  const remove = useCallback(() => {
    const deleted: DeleteUpdateType = {
      targetSfId: id,
      operation: 'delete',
      path: null,
    };
    queueBackendPatches(id, [deleted]);
    applyUpdates([deleted]);
  }, [applyUpdates, queueBackendPatches, id]);

  const handleSoundEnded = useCallback(() => {
    const audio = audioRef.current;
    if (loop) {
      audio.play();
    } else {
      remove();
    }
  }, [loop, remove]);

  const playSound = useCallback(() => {
    const audio = audioRef.current;
    audio.addEventListener('ended', handleSoundEnded);
    if (loop) {
      audio.loop = true;
    }
    audio.play();
  }, [handleSoundEnded, loop]);

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      audio.removeEventListener('ended', handleSoundEnded);
      audio.pause();
    };
  }, [handleSoundEnded, playSound, src]);

  useEffect(() => {
    updateVolume(volume ?? 1);
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = src || '';
    audio.currentTime = 0;
    playSound();
  }, [playSound, src]);

  return null;
});
