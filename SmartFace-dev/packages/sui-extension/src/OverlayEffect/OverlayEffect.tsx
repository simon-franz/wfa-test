import { useTheme } from '@emotion/react';
import { observer } from 'mobx-react';
import { useMemo } from 'react';

import { AutumnVibes } from './AutumnVibes/AutumnVibes';
import { Confetti } from './Confetti/Confetti';
import { ConfettiFireworks } from './ConfettiFireworks/ConfettiFireworks';
import { HalloweenVibes } from './HalloweenVibes/HalloweenVibes';
import type { OverlayEffectProps } from './OverlayEffect.types';
import { RocketFireworks } from './RocketFireworks/RocketFireworks';
import { SpringVibes } from './SpringVibes/SpringVibes';
import { SummerVibes } from './SummerVibes/SummerVibes';
import { VacationVibes } from './VacationVibes/VacationVibes';
import { WinterVibes } from './WinterVibes/WinterVibes';

export const OverlayEffect = observer(({ show = true, effect = 'confetti', duration }: OverlayEffectProps) => {
  const currentTheme = useTheme();
  const zIndex = currentTheme.marko.variables.zIndex.notifications;

  const memoizedEffect = useMemo(() => {
    if (!show) return;

    switch (effect) {
      case 'confetti':
        return <Confetti zIndex={zIndex} />;
      case 'confetti-fireworks':
        return <ConfettiFireworks zIndex={zIndex} duration={duration} />;
      case 'autumn-vibes':
        return <AutumnVibes zIndex={zIndex} duration={duration} />;
      case 'winter-vibes':
        return <WinterVibes zIndex={zIndex} duration={duration} />;
      case 'spring-vibes':
        return <SpringVibes zIndex={zIndex} duration={duration} />;
      case 'summer-vibes':
        return <SummerVibes zIndex={zIndex} duration={duration} />;
      case 'vacation-vibes':
        return <VacationVibes zIndex={zIndex} duration={duration} />;
      case 'rocket-fireworks':
        return <RocketFireworks zIndex={zIndex} duration={duration} />;
      case 'halloween-vibes':
        return <HalloweenVibes zIndex={zIndex} duration={duration} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, effect]);

  return memoizedEffect;
});
