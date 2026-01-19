import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@hrworks/design-system';
import CollapsibleMenu from '@hrworks/sui-core/CollapsibleMenu';
import Modal from '@hrworks/sui-core/Modal';
import { useFloat } from '@hrworks/sui-shared/components/Float/useFloat';
import { KeyboardNavigableList } from '@hrworks/sui-shared/components/KeyboardNavigableList';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { SqwMenuButton } from '../SqwMenuButton';
import { DropdownMenuTrigger, DropdownMenuWrapper, SqwDropdownMenuContext, type SqwDropdownMenuProps } from './';
import { S } from './SqwDropdownMenu.styles';

export const SqwDropdownMenu = observer(
  ({ items, title, icon, badge, presentation = 'dropdown', ...otherProps }: SqwDropdownMenuProps) => {
    const [expanded, setExpanded] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isPointerAndLargeDevice = useMediaQuery('isPointerAndLargeDevice');

    const _presentation = useMemo(() => {
      if (presentation === 'collapsibleMenu') {
        return presentation;
      }
      setExpanded(false);

      return isPointerAndLargeDevice ? 'dropdown' : 'modal';
    }, [isPointerAndLargeDevice, presentation]);

    const toggleDropdown = useCallback(() => setExpanded(!expanded), [expanded]);
    const contextValue = useMemo<SqwDropdownMenuContext>(
      () => ({
        toggleDropdown,
        closeDropdown: () => setExpanded(false),
        expanded,
        presentation: _presentation,
      }),
      [expanded, _presentation, toggleDropdown],
    );

    useEffect(() => {
      const onDocumentInteraction = (event: MouseEvent | FocusEvent | UIEvent) => {
        if (expanded && dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
          setExpanded(false);
        }
      };

      document.addEventListener('click', onDocumentInteraction);
      document.addEventListener('focus', onDocumentInteraction, { capture: true });

      return () => {
        document.removeEventListener('click', onDocumentInteraction);
        document.removeEventListener('focus', onDocumentInteraction, { capture: true });
      };
    }, [expanded]);

    const { small } = useTheme().marko.variables.spacing.distance;

    const { refs, floatingStyles } = useFloat({
      placement: 'bottom-start',
      flip: true,
      shift: true,
      mainAxisOffset: small,
      show: expanded,
      scroll: false,
    });

    const collapsibleMenuJsx = <CollapsibleMenu {...otherProps}>{items}</CollapsibleMenu>;

    return (
      <SqwDropdownMenuContext.Provider value={contextValue}>
        {_presentation === 'collapsibleMenu' ? (
          collapsibleMenuJsx
        ) : (
          <S.DropdownContainer ref={isPointerAndLargeDevice ? dropdownRef : null}>
            <DropdownMenuTrigger ref={refs.setReference}>
              <SqwMenuButton text={title} badge={badge} icon={icon} {...otherProps} />
            </DropdownMenuTrigger>
            {expanded && isPointerAndLargeDevice && (
              <div ref={refs.setFloating} style={floatingStyles}>
                <DropdownMenuWrapper>
                  <KeyboardNavigableList onBlur={() => setExpanded(false)}>{items}</KeyboardNavigableList>
                </DropdownMenuWrapper>
              </div>
            )}
            <Modal
              show={!isPointerAndLargeDevice && expanded}
              closeable
              size="small"
              title={title}
              onClose={() => setExpanded(false)}
            >
              {collapsibleMenuJsx}
            </Modal>
          </S.DropdownContainer>
        )}
      </SqwDropdownMenuContext.Provider>
    );
  },
);
