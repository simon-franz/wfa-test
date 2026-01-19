import { SuiThemeContext } from '@hrworks/design-system';
import { PanelGroupItem } from '@hrworks/sui-extension/PanelGroup/PanelGroupItem/PanelGroupItem';
import { PanelResizeHandle } from '@hrworks/sui-extension/PanelGroup/PanelResizeHandle/PanelResizeHandle';
import { githubDarkTheme, githubLightTheme, type JsonData, JsonEditor } from 'json-edit-react';
import { memo, useContext } from 'react';

import type { AdapterbookLayoutProps } from './AdapterbookLayout.types';
import { S } from './ExampleComponent.styles';
import { useHotkeyTogglePanelSize } from './hooks/useHotkeyTogglePanelSize';

export const AdapterbookLayout = memo(({ title, jsonData, setJsonData, children }: AdapterbookLayoutProps) => {
  const { colorScheme } = useContext(SuiThemeContext);
  const initialPanelSize = 61.8; // Golden ratio
  const threshold = 'extraSmall';

  const { componentPanelSize, onPanelResize } = useHotkeyTogglePanelSize({
    initialPanelSize,
    threshold,
  });

  return (
    <S.PanelGroup fullHeight defaultThreshold={threshold} direction={{ lg: 'horizontal', xs: 'vertical' }}>
      <PanelGroupItem size={componentPanelSize} onResize={onPanelResize}>
        <S.ContentContainer>
          <S.Title>{title}</S.Title>
          <S.PaddedWrapper>
            <S.IsolatedWrapper>{children}</S.IsolatedWrapper>
          </S.PaddedWrapper>
        </S.ContentContainer>
      </PanelGroupItem>
      <PanelResizeHandle />
      <PanelGroupItem size={componentPanelSize === 0 ? 100 : undefined}>
        <S.EditorWrapper>
          <JsonEditor
            maxWidth="unset"
            restrictDrag={false}
            data={jsonData || {}}
            setData={(newData: JsonData) => {
              setJsonData?.(newData);
            }}
            theme={colorScheme === 'dark' ? githubDarkTheme : githubLightTheme}
            defaultValue="New Value"
          />
        </S.EditorWrapper>
      </PanelGroupItem>
    </S.PanelGroup>
  );
});
