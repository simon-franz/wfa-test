import type { Meta, StoryFn } from '@storybook/react';
import { Component, type HTMLAttributes, type ReactNode } from 'react';

import { KeyboardNavigableList } from './KeyboardNavigableList';
import { type ItemPropsType, KeyboardNavigableListItem } from './KeyboardNavigableListItem/KeyboardNavigableListItem';
import { KeyboardNavigableListSublist } from './KeyboardNavigableListSublist/KeyboardNavigableListSublist';

export default {
  title: 'Components/Utils/KeyboardNavigableList',
  component: KeyboardNavigableList,
} as Meta<typeof KeyboardNavigableList>;

type StoryItemsPropsType = Parameters<ItemPropsType['item']>[0] & {
  sublist?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

class StoryItem extends Component<StoryItemsPropsType> {
  state = { hover: false };

  render() {
    const { focus, sublistOpen, sublist, children } = this.props;

    return (
      <div
        style={{
          backgroundColor: focus ? 'green' : this.state.hover ? 'lightgreen' : sublistOpen ? 'lightcyan' : 'white',
          position: 'relative',
        }}
      >
        {children}
        {sublist}
      </div>
    );
  }
}

const listLength = 6;
const nthItemSublist = 5;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template: StoryFn<typeof KeyboardNavigableList> = (_args) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <button>Trigger</button>
        <KeyboardNavigableList id="root-menu-0">
          {Array.from({ length: listLength }).map((_, rootIndex) => {
            return (
              <div key={rootIndex} style={{ position: 'relative' }}>
                <KeyboardNavigableListItem
                  id={`item-${rootIndex.toString()}`}
                  item={({ focus, sublistOpen }) => (
                    <StoryItem focus={focus} sublistOpen={sublistOpen}>
                      <button style={{ backgroundColor: 'transparent' }}>
                        Item {rootIndex} {!(rootIndex % nthItemSublist) && '>'}
                      </button>
                    </StoryItem>
                  )}
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  sublist={({ focus: _focus, sublistOpen: _sublistOpen }) =>
                    rootIndex % nthItemSublist ? undefined : (
                      <div
                        style={{
                          position: 'absolute',
                          left: '110%',
                          top: '0',
                        }}
                      >
                        <KeyboardNavigableListSublist>
                          {({ isOpen }) => (
                            <div style={{ height: isOpen ? 'auto' : 0, overflow: isOpen ? 'visible' : 'hidden' }}>
                              {Array.from({ length: listLength }).map((_, index) => (
                                <div key={index} style={{ position: 'relative' }}>
                                  <KeyboardNavigableListItem
                                    id={`sublist-item-${rootIndex}-${index.toString()}`}
                                    item={({ focus, sublistOpen }) => (
                                      <StoryItem focus={focus} sublistOpen={sublistOpen}>
                                        <button style={{ backgroundColor: 'transparent' }}>
                                          Item {index} {!(index % nthItemSublist) && '>'}
                                        </button>
                                      </StoryItem>
                                    )}
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    sublist={({ focus: _focus, sublistOpen: _sublistOpen }) =>
                                      index % nthItemSublist ? undefined : (
                                        <div
                                          style={{
                                            position: 'absolute',
                                            left: '110%',
                                            top: '0',
                                          }}
                                        >
                                          <KeyboardNavigableListSublist>
                                            {({ isOpen }) => (
                                              <div
                                                style={{
                                                  height: isOpen ? 'auto' : 0,
                                                  overflow: isOpen ? 'visible' : 'hidden',
                                                }}
                                              >
                                                {Array.from({ length: listLength }).map((_, index) => (
                                                  <KeyboardNavigableListItem
                                                    key={index}
                                                    item={({ focus, sublistOpen }) => (
                                                      <StoryItem focus={focus} sublistOpen={sublistOpen}>
                                                        <button
                                                          style={{
                                                            backgroundColor: 'transparent',
                                                          }}
                                                        >
                                                          Item {index}
                                                        </button>
                                                      </StoryItem>
                                                    )}
                                                  />
                                                ))}
                                              </div>
                                            )}
                                          </KeyboardNavigableListSublist>
                                        </div>
                                      )
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </KeyboardNavigableListSublist>
                      </div>
                    )
                  }
                />
              </div>
            );
          })}
        </KeyboardNavigableList>
      </div>
    </div>
  );
};

const DefaultProps = {};

export const Default = {
  render: Template,
  args: DefaultProps,
};
