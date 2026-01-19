import { SuiThemeContext } from '@hrworks/design-system';
import { ControlledCollapsibleMenu } from '@hrworks/sui-core/CollapsibleMenu/ControlledCollapsibleMenu';
import CollapsibleMenuEntry from '@hrworks/sui-core/CollapsibleMenu/Entry';
import { ControlledComboBox as ComboBox } from '@hrworks/sui-core/ComboBox';
import Page from '@hrworks/sui-core/Page';
import SuiProvider from '@hrworks/sui-core/SuiProvider';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { useContext, useMemo, useState } from 'react';

import { DarkModeToggle } from '../components/DarkModeToggle';
import { caseMap } from '../components/ExampleComponentCaseMapper';
import { map } from '../components/ExampleComponentMapper';
import { useComponentSearch } from '../components/hooks/useComponentSearch';
import { S } from './__root.styles';

const RootComponent = () => {
  const { colorScheme } = useContext(SuiThemeContext);
  const [expandedEntryIds, setExpandedEntryIds] = useState<string[]>(['component-pages']);
  const activeEntryId = '';
  const { value, query, getOptions, onValueChange, onQueryChange } = useComponentSearch();

  const logo = {
    alt: 'This is a logo',
    src:
      colorScheme === 'light'
        ? 'https://d9yw7530xbzu.cloudfront.net/assets/smartface-logo/v2/smartface-logo-horizontal-dark.svg'
        : 'https://d9yw7530xbzu.cloudfront.net/assets/smartface-logo/v2/smartface-logo-horizontal-light.svg',
  };

  const componentPages = useMemo(
    () => (
      <ControlledCollapsibleMenu
        multiple
        activeEntryId={activeEntryId}
        expandedEntryIds={expandedEntryIds}
        updateActiveEntryId={() => {}}
        updateExpandedEntryIds={setExpandedEntryIds}
      >
        {Object.keys(map).map((componentName) => {
          const lowerCaseName = componentName.toLowerCase();
          const id = `${lowerCaseName}-page`;

          const componentCases = Object.keys(caseMap).filter((key) => key.startsWith(componentName));

          return (
            <CollapsibleMenuEntry text={componentName} key={id}>
              <Link to="/$componentName" params={{ componentName: lowerCaseName }}>
                <CollapsibleMenuEntry text="Default" id={`${id}-default`} onClick={() => {}} />
              </Link>
              {componentCases.map((caseKey) => {
                const componentCase = caseKey.replace(componentName, '');
                const collapsibleMenuEntryName = componentCase.replaceAll(/([A-Z])/g, ' $1').trim();
                const caseId = `${id}-${componentCase.toLowerCase()}`;

                return (
                  <Link
                    key={caseKey}
                    to="/$componentName"
                    params={{ componentName: lowerCaseName }}
                    search={{ caseKey }}
                  >
                    <CollapsibleMenuEntry text={collapsibleMenuEntryName} id={caseId} onClick={() => {}} />
                  </Link>
                );
              })}
            </CollapsibleMenuEntry>
          );
        })}
      </ControlledCollapsibleMenu>
    ),
    [activeEntryId, expandedEntryIds],
  );

  return (
    <SuiProvider theme="dark">
      <Page modals={[]} notifications={[]} onDismissNotification={() => {}}>
        <S.ClassicLayout
          content={{ children: <Outlet /> }}
          sidebar={{ children: componentPages }}
          header={{
            flexComponentChildren: (
              <S.HeaderContentContainer>
                <S.ComboBoxWrapper>
                  <ComboBox
                    alwaysOpenOnFocus
                    getResultMinLength={1}
                    getResultDelay={500}
                    clearValueOnQueryChange={false}
                    label="Find components"
                    name="component-search"
                    size="extraSmall"
                    value={value}
                    query={query}
                    onValueChange={onValueChange}
                    onQueryChange={onQueryChange}
                    getOptions={getOptions}
                  />
                </S.ComboBoxWrapper>
                <DarkModeToggle />
              </S.HeaderContentContainer>
            ),
          }}
          logo={logo}
          desktopSidebarTogglerMode="fully-collapse"
        />
      </Page>
    </SuiProvider>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
