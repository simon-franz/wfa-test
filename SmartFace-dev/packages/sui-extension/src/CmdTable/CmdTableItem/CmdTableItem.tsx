import { LocalizationContext } from '@hrworks/localization';
import Button from '@hrworks/sui-core/Button';
import Tooltip from '@hrworks/sui-core/Tooltip';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef, useState } from 'react';

import { S } from './CmdTableItem.styles';
import type { CmdTableItemProps } from './CmdTableItem.types';

export const CmdTableItem = observer(
  ({ title, url, confirmed, onClick, signingUrl, ...otherProps }: CmdTableItemProps) => {
    const { translate } = useContext(LocalizationContext);

    const cellRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState('auto');

    useEffect(() => {
      if (!cellRef.current) return;
      const cellRefCurrent = cellRef.current;
      const updateWidth = () => {
        requestAnimationFrame(() => {
          if (cellRefCurrent) {
            const cellWidth = cellRefCurrent.getBoundingClientRect().width;
            if (cellWidth > 0) {
              setWidth(`${cellWidth}px`);
            }
          }
        });
      };

      const resizeObserver = new ResizeObserver(updateWidth);
      resizeObserver.observe(cellRefCurrent);

      updateWidth();

      return () => {
        cellRefCurrent && resizeObserver.unobserve(cellRefCurrent);
      };
    }, []);

    return (
      <>
        <S.TitleCell {...otherProps}>
          {url ? (
            <S.Link
              corner="square"
              rightIcon={<S.LinkIcon name="cmd-table-link" />}
              variant="link"
              title={title}
              href={url}
              target="_blank"
            >
              <S.LinkTextWrapper>{title}</S.LinkTextWrapper>
            </S.Link>
          ) : (
            <S.Title title={title}>{title}</S.Title>
          )}
        </S.TitleCell>

        <S.ButtonAndCheckedIconCell>
          <S.TransitionWrapper style={{ width }}>
            <div ref={cellRef}>
              {confirmed ? (
                <Tooltip trigger="hoverOrTouch" text={translate('cmd-table-confirmed-icon-tooltip')}>
                  <S.CheckmarkIconWrapper>
                    <S.CheckmarkIcon
                      aria-label={translate('cmd-table-confirmed-icon-aria-label')}
                      name="cmd-table-check"
                    />
                  </S.CheckmarkIconWrapper>
                </Tooltip>
              ) : (
                <Tooltip
                  trigger={signingUrl ? 'longHover' : 'longHoverOrLongTouch'}
                  text={translate(signingUrl ? 'cmd-table-sign-button-tooltip' : 'cmd-table-confirm-button-tooltip')}
                >
                  <Button
                    size="extraSmall"
                    onClick={onClick}
                    {...(signingUrl
                      ? {
                          children: translate('cmd-table-sign-button'),
                          href: signingUrl,
                          target: '_blank',
                        }
                      : { children: translate('cmd-table-confirm-button') })}
                  />
                </Tooltip>
              )}
            </div>
          </S.TransitionWrapper>
        </S.ButtonAndCheckedIconCell>
      </>
    );
  },
);
