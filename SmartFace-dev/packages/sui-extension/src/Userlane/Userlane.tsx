import type { UserlaneActionEventType } from '@hrworks/smartface/main/lib/EventController';
import { getSmartFaceBackendConfigProperty } from '@hrworks/smartface/main/lib/getSmartFaceBackendConfigProperty';
import type { UserlaneUiPropsType } from '@hrworks/smartface/types/extension/UserlaneType';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    Userlane: {
      (command: string, ...args: unknown[]): void;
      q?: any[][];
    };
  }
}

export const Userlane = observer((props: UserlaneUiPropsType) => {
  const config = getSmartFaceBackendConfigProperty('sfGuidanceHandler')?.config;
  const {
    application = config?.application,
    language = config?.language || 'de',
    userId = config?.userId,
    segmentAttributes = config?.segmentAttributes,
  } = props;

  const [isUserlaneReady, setIsUserlaneReady] = useState(false);
  const openAssistantAfterUserlaneIsReadyRef = useRef(false);

  useEffect(() => {
    window.Userlane =
      window.Userlane ||
      ((...args: any[]) => {
        window.Userlane.q = window.Userlane.q || [];
        window.Userlane.q.push(args);
      });

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://cdn.userlane.com/userlane.js';

    const headTag = document.querySelectorAll('head')[0];
    headTag.insertBefore(script, headTag.firstChild);

    script.onload = () => {
      window.Userlane('init', application);
      language && window.Userlane('lang', language);
      (segmentAttributes || userId) && window.Userlane('identify', userId, segmentAttributes);
    };

    return () => {
      script.remove();
    };
    // React is unable to check deep segmentAttribute updates
    // With JSON.stringify we can bypass this limitation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [application, language, JSON.stringify(segmentAttributes), userId]);

  const openAssistant = () => {
    window.Userlane('openAssistant');
  };

  const onOpenUserlaneAssistant = useCallback(() => {
    isUserlaneReady ? openAssistant() : (openAssistantAfterUserlaneIsReadyRef.current = true);
  }, [isUserlaneReady]);

  const onStartTour = useCallback((event: UserlaneActionEventType) => {
    event.detail.tour && window.Userlane('start', event.detail.tour.id, event.detail.tour.step);
  }, []);

  const handleUserlaneActionEvent = useCallback(
    (event: UserlaneActionEventType) => {
      event.detail.action === 'open-assistant' && onOpenUserlaneAssistant();
      event.detail.action === 'start-tour' && onStartTour(event);
    },
    [onOpenUserlaneAssistant, onStartTour],
  );

  useLayoutEffect(() => {
    window.addEventListener('userlane-action' as any, handleUserlaneActionEvent);

    return () => {
      window.removeEventListener('userlane-action' as any, handleUserlaneActionEvent);
    };
  }, [handleUserlaneActionEvent]);

  const setUserlaneStateAndOpenAssistant = useCallback(() => {
    setIsUserlaneReady(true);
    if (openAssistantAfterUserlaneIsReadyRef.current) {
      openAssistant();
    }
  }, []);

  useEffect(() => {
    const checkForUserlane = (mutationsList: MutationRecord[], observer: MutationObserver) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (
              node instanceof HTMLElement &&
              node.nodeType === 1 &&
              node.classList.contains('userlane-scroll-blocker')
            ) {
              setUserlaneStateAndOpenAssistant();
              observer.disconnect();
            }
          });
        }
      });
    };
    const observer = new MutationObserver(checkForUserlane);
    observer.observe(document.documentElement, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [setUserlaneStateAndOpenAssistant]);

  useEffect(() => {
    const timer = setTimeout(() => {
      !isUserlaneReady && setUserlaneStateAndOpenAssistant();
    }, 5000);

    return () => clearTimeout(timer);
  }, [isUserlaneReady, setUserlaneStateAndOpenAssistant]);

  return null;
});
