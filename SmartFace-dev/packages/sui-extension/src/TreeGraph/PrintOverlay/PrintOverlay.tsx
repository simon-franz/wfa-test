import { forwardRef } from 'react';

import { S } from './PrintOverlay.styles';
import type { PrintOverlayProps } from './PrintOverlay.types';

export const PrintOverlay = forwardRef<HTMLDivElement, PrintOverlayProps>(({ printImg, orientation }, ref) => {
  if (printImg === '') {
    return null;
  }

  return (
    <S.PrintOverlay ref={ref}>
      <S.PrintImg src={printImg} alt="Print" />
      {orientation === 'landscape' && (
        <style type="text/css" media="print">
          {'@page { size: landscape; }'}
        </style>
      )}
    </S.PrintOverlay>
  );
});
