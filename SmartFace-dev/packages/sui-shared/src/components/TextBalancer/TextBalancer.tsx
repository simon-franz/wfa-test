import { type ReactNode, useMemo } from 'react';
import { Balancer } from 'react-wrap-balancer';

import { detectBrowser } from '../../functions/detectBrowser';

type TextBalancerProps = {
  children: ReactNode;
};

export const TextBalancer = ({ children }: TextBalancerProps) => {
  const isSafari = useMemo(() => detectBrowser() === 'Safari', []);

  if (isSafari) {
    return (
      <span>
        <Balancer>{children}</Balancer>
      </span>
    );
  }

  return <>{children}</>;
};
