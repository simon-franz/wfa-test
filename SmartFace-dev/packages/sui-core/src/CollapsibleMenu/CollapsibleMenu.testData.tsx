import { mockComponents } from '@hrworks/cypress-utils/fixtures';

import { CollapsibleMenuEntry } from './Entry/CollapsibleMenuEntry';
import { CollapsibleMenuSection } from './Section/CollapsibleMenuSection';

export const generateChildren = (
  renderWithDecals?: boolean,
  decalsFirstLayerOnly?: boolean,
  setEntryOnClickSpy?: boolean,
) => {
  const renderDecalsCondition = renderWithDecals && !decalsFirstLayerOnly;

  const { Icon, Badge } = mockComponents;

  return (
    <>
      <CollapsibleMenuSection data-cy="section" data-guide-id="data-guide-section" title="Section 1">
        <CollapsibleMenuEntry
          icon={renderWithDecals && Icon}
          badge={renderWithDecals && Badge}
          text="Menu 1"
          data-cy="entry"
          data-guide-id="data-guide-entry"
          onClick={setEntryOnClickSpy ? cy.spy().as('onClickSpy') : undefined}
          id="menu"
        >
          <CollapsibleMenuSection title="Section 2">
            <CollapsibleMenuEntry
              data-cy="hidden"
              icon={renderDecalsCondition && Icon}
              badge={renderDecalsCondition && Badge}
              text="Submenu 2.1"
              id="menu-2"
            >
              <CollapsibleMenuSection title="Section 3">
                <CollapsibleMenuEntry
                  icon={renderDecalsCondition && Icon}
                  badge={renderDecalsCondition && Badge}
                  text="Submenu 3.1"
                  id="menu-3"
                >
                  <CollapsibleMenuSection title="Section 4">
                    <CollapsibleMenuEntry
                      icon={renderDecalsCondition && Icon}
                      badge={renderDecalsCondition && Badge}
                      text="Submenu 4.1"
                      id="menu-4"
                    >
                      <CollapsibleMenuSection title="Section 5">
                        <CollapsibleMenuEntry
                          icon={renderDecalsCondition && Icon}
                          badge={renderDecalsCondition && Badge}
                          text="Submenu 5.1"
                        />
                        <CollapsibleMenuEntry text="Submenu 5.2" />
                      </CollapsibleMenuSection>
                    </CollapsibleMenuEntry>
                  </CollapsibleMenuSection>
                </CollapsibleMenuEntry>
              </CollapsibleMenuSection>
            </CollapsibleMenuEntry>
          </CollapsibleMenuSection>
          <CollapsibleMenuEntry text="Submenu 2.2" />
        </CollapsibleMenuEntry>
      </CollapsibleMenuSection>
      <CollapsibleMenuSection title="Section">
        <CollapsibleMenuEntry data-cy="entry2" href="/" target="_blank" text="Menu 2">
          <CollapsibleMenuEntry text="Submenu 2.1" />
        </CollapsibleMenuEntry>
      </CollapsibleMenuSection>
      <CollapsibleMenuSection title="Section">
        <CollapsibleMenuEntry data-cy="entry3" text="Menu 3">
          <CollapsibleMenuEntry text="Submenu 2.1" />
        </CollapsibleMenuEntry>
      </CollapsibleMenuSection>
    </>
  );
};
