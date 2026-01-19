import { LocalizationContext } from '@hrworks/localization';
import Alert from '@hrworks/sui-core/Alert';
import debounce from 'lodash/debounce';
import { observer } from 'mobx-react';
import { useContext, useEffect, useMemo, useState } from 'react';
import Cropper from 'react-easy-crop';

import Slider from '../Slider';
import { S } from './ImageCropper.styles';
import type { ImageCropperProps } from './ImageCropper.types';
import { RotateImageButton } from './RotateImageButton/RotateImageButton';

export const ImageCropper = observer(({ name, url, ...otherProps }: ImageCropperProps) => {
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [minZoom, setMinZoom] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string>('');
  const [image, setImage] = useState<HTMLImageElement | null>();
  const [hasError, setHasError] = useState(false);
  const maxZoom = useMemo(() => minZoom + 5, [minZoom]);
  const { translate } = useContext(LocalizationContext);
  const size = S.componentConfig.size;

  const onClickRotate = (angle: number) => {
    setRotation((prev) => (prev + angle) % 360);
  };

  useEffect(() => {
    const fn = async () => {
      setHasError(false);
      const image = await new Promise<HTMLImageElement>((resolve) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => {
          setHasError(true);
          resolve(image);
        };
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
      });
      setImage(image);
    };
    fn();
  }, [url]);

  const onCropComplete: Cropper['props']['onCropComplete'] = useMemo(
    () =>
      debounce((croppedArea, croppedAreaPixels) => {
        if (!image) {
          return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return;
        }

        const rotateCanvas = document.createElement('canvas');
        const rotateCtx = rotateCanvas.getContext('2d');
        if (!rotateCtx) {
          return;
        }

        rotateCanvas.width = image.width;
        rotateCanvas.height = image.height;

        rotateCtx.translate(rotateCanvas.width / 2, rotateCanvas.height / 2);
        rotateCtx.rotate((rotation * Math.PI) / 180);
        rotateCtx.drawImage(image, -image.width / 2, -image.height / 2);

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        const sourceX = (croppedArea.x / 100) * rotateCanvas.width;
        const sourceY = (croppedArea.y / 100) * rotateCanvas.height;
        const sourceWidth = (croppedArea.width / 100) * rotateCanvas.width;
        const sourceHeight = (croppedArea.height / 100) * rotateCanvas.height;

        ctx.drawImage(rotateCanvas, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);

        setCroppedImage(canvas.toDataURL('image/*'));
      }, 250),
    [image, rotation],
  );

  useEffect(() => {
    setLoaded(false);
    const img = new Image();
    img.onload = () => {
      const shortEdge = img.width < img.height ? img.width : img.height;
      const extraZoom = shortEdge < size && size / shortEdge;
      const actualZoom = extraZoom || Math.max(img.width / img.height, img.height / img.width);
      setZoom(actualZoom);
      setMinZoom(actualZoom);
      setLoaded(true);
    };
    img.src = url;
  }, [size, url]);

  if (hasError || !url) return <Alert text={translate('image-loading-error')} color="danger" />;

  return (
    <>
      <input hidden aria-hidden readOnly name={name} value={croppedImage} />
      <S.ImageCropperContainer {...otherProps}>
        <S.CropperContainer>
          <RotateImageButton direction="left" onClick={() => onClickRotate(-90)} />
          {loaded ? (
            <Cropper
              image={url}
              crop={crop}
              zoom={zoom}
              minZoom={minZoom}
              maxZoom={maxZoom}
              aspect={1}
              cropSize={{ height: size, width: size }}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape="round"
              showGrid={false}
              rotation={rotation}
            />
          ) : (
            <S.LoadingAnimation type="spinner" />
          )}
          <RotateImageButton direction="right" onClick={() => onClickRotate(90)} />
        </S.CropperContainer>
        <S.SliderContainer loaded={loaded}>
          <Slider
            min={minZoom}
            max={maxZoom}
            step={0.1}
            value={zoom}
            showTrack={false}
            onValueChange={(zoom) => setZoom(Array.isArray(zoom) ? zoom[0] : zoom)}
          />
        </S.SliderContainer>
      </S.ImageCropperContainer>
    </>
  );
});
