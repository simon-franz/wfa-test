import { useEffect, useState } from 'react';

type CameraOptions = {
  delay?: number;
  pollingInterval?: number;
};

export const useDeviceCameras = ({ delay = 15_000, pollingInterval = 500 }: CameraOptions = {}) => {
  const [cameraCount, setCameraCount] = useState(0);
  const [facingMode, setFacingMode] = useState<MediaTrackConstraints['facingMode']>('user');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      const mediaDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDeviceCount = mediaDevices.filter((device) => device.kind === 'videoinput').length;
      if (videoDeviceCount === 0) return;
      setIsLoading(false);
      if (videoDeviceCount > 1) {
        setCameraCount(videoDeviceCount);
        clearInterval(interval);
      }
    }, pollingInterval);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [delay, pollingInterval]);

  const toggleFacingMode = () => {
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
  };

  return {
    cameraCount,
    isLoading,
    facingMode,
    toggleFacingMode,
  };
};
