import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import type { PortalProps } from './Portal.types';

export const Portal = ({ children, container: _container, selector = 'body' }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const container = _container || document.querySelector(selector);

  if (!container) return null;

  return createPortal(children, container);
};
